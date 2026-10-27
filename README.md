# Quiz Builder

Full-stack application for building quizzes with different question types. Users create a quiz, see all quizzes in a dashboard and open any quiz to view its structure.

Supported question types:

- **Boolean**: True/False with one correct answer.
- **Input**: short text answer.
- **Checkbox**: several options, one or more of them correct.

Pages: `/quizzes` (list with delete), `/quizzes/:id` (read-only quiz structure) and `/create` (quiz form). `/` redirects to `/quizzes`.

## Tech stack

| Area     | Tools                                                                |
| -------- | -------------------------------------------------------------------- |
| Backend  | NestJS 12, TypeScript, Prisma 7, PostgreSQL 18                       |
| Shared   | Zod 4 schemas and API types used by both backend and frontend        |
| Frontend | Next.js 16 (Pages Router), React 19, Tailwind CSS 4, React Hook Form |
| Tooling  | pnpm workspaces, ESLint (typescript-eslint), Prettier, Docker        |

## Project structure

```
quiz-builder/
├── backend/            # NestJS REST API
│   ├── prisma/         # schema, migrations, seed script
│   └── src/
│       ├── libs/       # config (env validation), Prisma service, Zod validation pipe
│       └── modules/    # feature modules (quizzes)
├── frontend/           # Next.js app (Pages Router)
│   └── src/
│       ├── pages/      # /quizzes, /quizzes/[id], /create
│       ├── components/ # UI components
│       ├── services/   # API client (all HTTP calls go through here)
│       └── libs/       # config (env validation), enums (routes, API paths)
├── packages/
│   └── shared/         # @quiz/shared: Zod schemas, enums, request/response types
├── docker-compose.yml  # local PostgreSQL
└── package.json        # root scripts for the whole workspace
```

The request validation rules live once, in `packages/shared`. The backend validates request bodies with these schemas, and the frontend form uses the same schemas, so the two sides cannot drift apart.

## Prerequisites

- Node.js 22 or newer (developed on Node.js 24)
- pnpm 11: `corepack enable`, or let pnpm download the pinned version automatically (`devEngines` in `package.json`)
- Docker with Docker Compose (for PostgreSQL)

## Getting started

All commands run from the repository root.

1. Install dependencies for all packages:

   ```bash
   pnpm install
   ```

2. Create the environment files from the examples:

   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

   | File            | Used by        | Variables                                                            |
   | --------------- | -------------- | -------------------------------------------------------------------- |
   | `.env`          | Docker Compose | `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT` |
   | `backend/.env`  | NestJS, Prisma | `DATABASE_URL`, `PORT` (default `3001`), `CORS_ORIGIN`               |
   | `frontend/.env` | Next.js        | `NEXT_PUBLIC_API_URL`                                                |

   The defaults work together out of the box. If port `5432` is already taken on your machine, set `POSTGRES_PORT=5433` in `.env` and use the same port in `DATABASE_URL` in `backend/.env`.

3. Start PostgreSQL (waits until the database is healthy):

   ```bash
   pnpm db:up
   ```

4. Apply the migrations and generate the Prisma client:

   ```bash
   pnpm db:migrate
   ```

5. Optionally, add sample quizzes (see [Creating a sample quiz](#creating-a-sample-quiz)):

   ```bash
   pnpm db:seed
   ```

6. Start the app in watch mode:

   ```bash
   pnpm dev
   ```

   The web app is available at `http://localhost:3000` and the API at `http://localhost:3001`.

To stop the database, run `pnpm db:down`. Data is kept in the `pgdata` Docker volume.

## Creating a sample quiz

**Seed script.** `pnpm db:seed` creates two quizzes, "JavaScript Basics" and "HTTP Fundamentals", each with all three question types. The script validates its data with the same schema as `POST /quizzes` and skips quizzes that already exist, so it is safe to run more than once. Source: [`backend/prisma/seed.ts`](backend/prisma/seed.ts).

**Web app.** Open `http://localhost:3000/create`, enter a title, add questions (pick a type for each, mark the correct answers) and click **Save quiz**. The same validation rules as the API run in the form, and you are redirected to the new quiz.

**API request.** With the backend running:

```bash
curl -X POST http://localhost:3001/quizzes \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "My first quiz",
    "questions": [
      { "type": "BOOLEAN", "text": "The sky is blue.", "correctAnswer": true },
      { "type": "INPUT", "text": "2 + 2 = ?", "correctAnswer": "4" },
      {
        "type": "CHECKBOX",
        "text": "Which are fruits?",
        "options": [
          { "text": "Apple", "isCorrect": true },
          { "text": "Carrot", "isCorrect": false },
          { "text": "Banana", "isCorrect": true }
        ]
      }
    ]
  }'
```

## API

Base URL: `http://localhost:3001`

| Method   | Path           | Description                                                         | Success             | Errors       |
| -------- | -------------- | ------------------------------------------------------------------- | ------------------- | ------------ |
| `POST`   | `/quizzes`     | Create a quiz with its questions                                    | `201` QuizDetail    | `400`        |
| `GET`    | `/quizzes`     | List quizzes: id, title, question count, created date, newest first | `200` QuizSummary[] |              |
| `GET`    | `/quizzes/:id` | Full quiz with questions in creation order                          | `200` QuizDetail    | `400`, `404` |
| `DELETE` | `/quizzes/:id` | Delete a quiz with all its questions                                | `204`               | `400`, `404` |

Validation rules for `POST /quizzes`:

- `title`: 1 to 200 characters, surrounding whitespace is trimmed.
- `questions`: 1 to 50 items. Each question has `type` and `text` (1 to 500 characters).
- `BOOLEAN` needs `correctAnswer: boolean`, `INPUT` needs `correctAnswer: string` (1 to 200 characters).
- `CHECKBOX` needs 2 to 10 unique `options`, at least one with `isCorrect: true`.
- `:id` must be a UUID.

Validation errors return `400` with a list of issues, where `path` points to the invalid field:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "issues": [
    { "path": "title", "message": "Title is required" },
    { "path": "questions.0.options", "message": "Mark at least one option as correct" }
  ]
}
```

## Database

Three tables, created by the migration in [`backend/prisma/migrations`](backend/prisma/migrations):

- `quizzes`: `id`, `title`, `created_at`, `updated_at`.
- `questions`: belongs to a quiz; stores `position` (order in the quiz), `type`, `text` and the correct answer in `boolean_answer` (Boolean questions) or `text_answer` (Input questions).
- `question_options`: options of Checkbox questions with `is_correct` and `position`.

Deleting a quiz removes its questions and options through `ON DELETE CASCADE`. A `CHECK` constraint makes sure every question stores its answer in the column that matches its type. Database triggers make sure options can only belong to Checkbox questions.

To browse the data, run `pnpm --filter backend prisma:studio`.

## Scripts

Root scripts (run with `pnpm <script>`):

| Script       | What it does                                                               |
| ------------ | -------------------------------------------------------------------------- |
| `dev`        | Builds `@quiz/shared`, then runs it, the API and the web app in watch mode |
| `build`      | Builds `@quiz/shared`, the backend and the frontend                        |
| `db:up`      | Starts PostgreSQL in Docker                                                |
| `db:down`    | Stops PostgreSQL                                                           |
| `db:migrate` | Applies migrations and generates the Prisma client                         |
| `db:seed`    | Adds the sample quizzes                                                    |
| `lint`       | Runs ESLint for the whole repository (`lint:fix` to auto-fix)              |
| `format`     | Formats all files with Prettier (`format:check` only checks)               |

When you change `backend/prisma/schema.prisma`, create a new migration with `pnpm --filter backend prisma:migrate`.

## License

[MIT](LICENSE)
