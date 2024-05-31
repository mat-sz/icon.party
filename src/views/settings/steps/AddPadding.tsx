import React from 'react';

import { OutputStepAddPadding } from '$/types';
import { StepProps } from './types';
import styles from './index.module.scss';

export const AddPadding: React.FC<StepProps<OutputStepAddPadding>> = () => {
  return (
    <div className={styles.step}>
      <div className={styles.title}>Add padding</div>
    </div>
  );
};
