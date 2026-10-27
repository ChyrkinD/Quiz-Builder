import type {
  BooleanQuestionPayload,
  CheckboxOptionPayload,
  CheckboxQuestionPayload,
  InputQuestionPayload,
} from './quiz-payload.types.js';

export type CheckboxOption = CheckboxOptionPayload & { id: string };

export type BooleanQuestion = BooleanQuestionPayload & { id: string };
export type InputQuestion = InputQuestionPayload & { id: string };
export type CheckboxQuestion = Omit<CheckboxQuestionPayload, 'options'> & {
  id: string;
  options: CheckboxOption[];
};

export type Question = BooleanQuestion | InputQuestion | CheckboxQuestion;

export interface QuizSummary {
  id: string;
  title: string;
  questionCount: number;
  createdAt: string;
}

export interface QuizDetail {
  id: string;
  title: string;
  createdAt: string;
  questions: Question[];
}
