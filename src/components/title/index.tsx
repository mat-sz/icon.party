import React from 'react';

import styles from './index.module.scss';
import { BsArrowLeft } from 'react-icons/bs';

export const Title: React.FC<
  React.PropsWithChildren<{ onBack?: () => void }>
> = ({ onBack, children }) => {
  return (
    <div className={styles.title}>
      <div>
        {onBack && (
          <button onClick={onBack}>
            <BsArrowLeft />
            <span>Back</span>
          </button>
        )}
      </div>
      <h2>{children}</h2>
    </div>
  );
};
