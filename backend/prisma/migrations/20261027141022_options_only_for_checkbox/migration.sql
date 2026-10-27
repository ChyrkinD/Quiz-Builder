CREATE FUNCTION "question_options_require_checkbox"() RETURNS trigger AS $$
BEGIN
  IF (SELECT "type" FROM "questions" WHERE "id" = NEW."question_id") <> 'CHECKBOX' THEN
    RAISE EXCEPTION 'question_options can only belong to CHECKBOX questions'
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "question_options_require_checkbox"
BEFORE INSERT OR UPDATE OF "question_id" ON "question_options"
FOR EACH ROW EXECUTE FUNCTION "question_options_require_checkbox"();

CREATE FUNCTION "questions_keep_options_checkbox"() RETURNS trigger AS $$
BEGIN
  IF NEW."type" <> 'CHECKBOX' AND EXISTS (
    SELECT 1 FROM "question_options" WHERE "question_id" = NEW."id"
  ) THEN
    RAISE EXCEPTION 'questions with options must stay CHECKBOX'
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "questions_keep_options_checkbox"
BEFORE UPDATE OF "type" ON "questions"
FOR EACH ROW EXECUTE FUNCTION "questions_keep_options_checkbox"();
