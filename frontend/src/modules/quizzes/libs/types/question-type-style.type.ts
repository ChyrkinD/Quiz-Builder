import type { ColorTone, IconName } from '~/libs/enums/enums';

export type QuestionTypeStyle = {
  iconName: IconName;
  label: string;
  selected: string;
  tone: ColorTone;
};
