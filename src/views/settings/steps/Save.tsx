import React from 'react';

import { OutputStepSave } from '$/types';
import { StepProps } from './types';
import styles from './index.module.scss';

export const Save: React.FC<StepProps<OutputStepSave>> = () => {
  return (
    <div className={styles.step}>
      <div className={styles.title}>Save</div>
    </div>
  );
};
