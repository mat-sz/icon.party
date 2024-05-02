import React from 'react';

import { OutputStepScale } from '$/types';
import { StepProps } from './types';
import styles from './index.module.scss';

export const Scale: React.FC<StepProps<OutputStepScale>> = () => {
  return (
    <div className={styles.step}>
      <div className={styles.title}>Scale</div>
    </div>
  );
};
