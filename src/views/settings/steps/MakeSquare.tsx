import React from 'react';

import { OutputStepMakeSquare } from '$/types';
import { StepProps } from './types';
import styles from './index.module.scss';

export const MakeSquare: React.FC<StepProps<OutputStepMakeSquare>> = () => {
  return (
    <div className={styles.step}>
      <div className={styles.title}>Make image square</div>
    </div>
  );
};
