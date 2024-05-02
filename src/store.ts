import { atom, computed } from 'nanostores';

import { Settings, Step } from './types';

export const $file = atom<File | undefined>(undefined);
export const $settings = atom<Settings | undefined>(undefined);

export const $step = computed([$file, $settings], (file, settings) => {
  if (!file) {
    return Step.SELECT_FILE;
  }

  if (!settings) {
    return Step.SELECT_PRESET;
  }

  return Step.MODIFY_SETTINGS;
});
