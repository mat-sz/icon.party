import React from 'react';
import clsx from 'clsx';

import styles from './Preset.module.scss';
import { Preset as PresetType } from '$/types';

interface Props {
  preset: PresetType;
  isSelected?: boolean;
  onToggle?: () => void;
}

export const Preset: React.FC<Props> = ({ preset, isSelected, onToggle }) => {
  return (
    <li
      className={clsx(styles.preset, { [styles.selected]: isSelected })}
      role="button"
      key={preset.id}
    >
      <label>
        <input type="checkbox" checked={isSelected} onChange={onToggle} />
        <div>
          <div className={styles.title}>{preset.title}</div>
          <div className={styles.description}>{preset.description}</div>
        </div>
      </label>
    </li>
  );
};
