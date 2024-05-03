import React from 'react';

import { FilePicker } from '$/components/filePicker';
import { $file } from '$/store';
import styles from './index.module.scss';

export const HomeStep: React.FC = () => {
  return (
    <>
      <div className={styles.hero}>
        <h1>
          All the icon formats you need,
          <br />
          in one place
        </h1>
        <h2>
          icon.party lets you convert icon files, like nothing else before.
        </h2>
        <div className={styles.info}>
          <p>
            Easily convert your icons without the need to pay for obscure macOS
            apps or hunt for 3 different icon generators. Completely free,
            without watermarks. Your icons are never transmitted to any servers,
            everything happens in your browser.
          </p>
          <p>
            icon.party currently can generate icons only for Electron projects.
            iOS, Android and PWA support is coming soon.
          </p>
        </div>
      </div>
      <FilePicker
        dropzone
        paste
        onFiles={files => {
          $file.set(files[0]);
        }}
      >
        {state => (
          <div onClick={state.open} className={styles.dropzone}>
            Click here or drag and drop an image to start
          </div>
        )}
      </FilePicker>
    </>
  );
};
