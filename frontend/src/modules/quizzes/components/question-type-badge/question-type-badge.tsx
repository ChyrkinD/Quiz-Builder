import type { FC } from 'react';

import type { QuestionType } from '~/modules/quizzes/libs/enums/enums';
import { Badge } from '~/components/components';
import { ComponentSize } from '~/libs/enums/enums';
import { questionTypeToStyle } from '~/modules/quizzes/libs/maps/maps';

type Properties = {
  type: QuestionType;
};

const QuestionTypeBadge: FC<Properties> = ({ type }) => {
  const style = questionTypeToStyle[type];

  return (
    <Badge iconName={style.iconName} size={ComponentSize.SM} tone={style.tone}>
      {style.label}
    </Badge>
  );
};

export { QuestionTypeBadge };
