import React from 'react';

import { OutputStepApplyMask } from '$/types';
import { StepProps } from './types';
import styles from './index.module.scss';

export const ApplyMask: React.FC<StepProps<OutputStepApplyMask>> = () => {
  return (
    <div className={styles.step}>
      <div className={styles.title}>Apply mask</div>
    </div>
  );
};
