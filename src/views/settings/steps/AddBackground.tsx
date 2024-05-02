import React from 'react';

import { OutputStepAddBackground } from '$/types';
import { StepProps } from './types';
import styles from './index.module.scss';

export const AddBackground: React.FC<
  StepProps<OutputStepAddBackground>
> = () => {
  return (
    <div className={styles.step}>
      <div className={styles.title}>Add background</div>
    </div>
  );
};
