import { ColorTone } from '~/libs/enums/enums';
import { colorToneToSoftClasses } from '~/libs/maps/maps';

const TILE_TONES = [ColorTone.PRIMARY, ColorTone.BOOLEAN, ColorTone.INPUT, ColorTone.CHECKBOX];

export const getTileClasses = (id: string): string => {
  const hash = [...id].reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return colorToneToSoftClasses[TILE_TONES[hash % TILE_TONES.length] ?? ColorTone.PRIMARY];
};
