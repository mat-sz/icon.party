import React from 'react';

import { presets } from '$/presets';
import { $file, $settings } from '$/store';
import styles from './index.module.scss';
import { Title } from '$/components/title';

export const PresetStep: React.FC = () => {
  return (
    <div className={styles.presets}>
      <Title
        onBack={() => {
          $file.set(undefined);
          $settings.set(undefined);
        }}
      >
        Select the platforms you wish to target
      </Title>
      <ul>
        {presets.map(preset => (
          <li
            className={styles.preset}
            role="button"
            onClick={() => $settings.set(preset.settings)}
            key={preset.id}
          >
            {preset.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
