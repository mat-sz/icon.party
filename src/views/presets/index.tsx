import React, { useState } from 'react';

import { presets } from '$/presets';
import { $file, $settings } from '$/store';
import styles from './index.module.scss';
import { Title } from '$/components/title';
import { Settings } from '$/types';
import { Preset } from './Preset';

export const PresetsStep: React.FC = () => {
  const [selectedPresets, setSelectedPresets] = useState<string[]>([]);

  return (
    <div className={styles.presets}>
      <Title
        onBack={() => {
          $file.set(undefined);
          $settings.set(undefined);
        }}
      >
        Select the platforms you'd wish to target
      </Title>
      <ul>
        {presets.map(preset => {
          const isSelected = selectedPresets.includes(preset.id);
          const toggle = () => {
            setSelectedPresets(current =>
              selectedPresets.includes(preset.id)
                ? current.filter(id => id !== preset.id)
                : [...current, preset.id],
            );
          };

          return (
            <Preset
              preset={preset}
              isSelected={isSelected}
              onToggle={toggle}
              key={preset.id}
            />
          );
        })}
      </ul>
      <button
        onClick={() => {
          const settings: Settings = {
            outputs: [],
          };

          for (const id of selectedPresets) {
            const preset = presets.find(preset => preset.id === id);
            if (preset) {
              settings.outputs.push(...preset.settings.outputs);
            }
          }

          $settings.set(settings);
        }}
        disabled={selectedPresets.length === 0}
      >
        <span>Continue</span>
      </button>
    </div>
  );
};
