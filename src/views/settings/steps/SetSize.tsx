import React from 'react';

import { OutputStepSetSize } from '$/types';
import { StepProps } from './types';
import styles from './index.module.scss';

export const SetSize: React.FC<StepProps<OutputStepSetSize>> = () => {
  return (
    <div className={styles.step}>
      <div className={styles.title}>Set size</div>
    </div>
  );
};
