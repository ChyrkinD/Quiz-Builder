import { ColorTone } from '~/libs/enums/enums';

export const colorToneToSoftClasses = {
  [ColorTone.PRIMARY]: 'bg-primary-soft text-primary-strong',
  [ColorTone.BOOLEAN]: 'bg-boolean-soft text-boolean-strong',
  [ColorTone.INPUT]: 'bg-input-soft text-input-strong',
  [ColorTone.CHECKBOX]: 'bg-checkbox-soft text-checkbox-strong',
  [ColorTone.DANGER]: 'bg-danger-soft text-danger-strong',
} satisfies Record<ColorTone, string>;

export const colorToneToIconTileClasses = {
  [ColorTone.PRIMARY]: 'bg-primary-soft text-primary',
  [ColorTone.BOOLEAN]: 'bg-boolean-soft text-boolean',
  [ColorTone.INPUT]: 'bg-input-soft text-input',
  [ColorTone.CHECKBOX]: 'bg-checkbox-soft text-checkbox',
  [ColorTone.DANGER]: 'bg-danger-soft text-danger',
} satisfies Record<ColorTone, string>;

export const colorToneToFillClasses = {
  [ColorTone.PRIMARY]: 'bg-primary',
  [ColorTone.BOOLEAN]: 'bg-boolean',
  [ColorTone.INPUT]: 'bg-input',
  [ColorTone.CHECKBOX]: 'bg-checkbox',
  [ColorTone.DANGER]: 'bg-danger',
} satisfies Record<ColorTone, string>;
