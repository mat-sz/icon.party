import { useStore } from '@nanostores/react';
import React from 'react';
import JSZip from 'jszip';

import { download } from '$/utils/file';
import {
  canvasToBlob,
  imageToCanvas,
  loadImage,
  maskImage,
  scaleImage,
} from '$/utils/image';
import { ImageScaleMode, OutputStepType, SaveFormat, Settings } from '$/types';
import { masks } from '$/presets';
import { $file, $settings } from '$/store';
import { writeICNS } from '$/utils/icns';
import { writeICO } from '$/utils/ico';
import { steps } from './steps';

import styles from './index.module.scss';
import { Title } from '$/components/title';

async function generateIcons(file: File, settings: Settings) {
  const zip = new JSZip();
  const image = await loadImage(URL.createObjectURL(file));

  for (const output of settings.outputs) {
    let canvas = imageToCanvas(image);

    for (const step of output.steps) {
      switch (step.type) {
        case OutputStepType.MAKE_SQUARE:
          if (image.naturalWidth !== image.naturalHeight) {
            const size = Math.min(image.naturalWidth, image.naturalHeight);
            canvas = scaleImage(canvas, size, size, step.data.mode);
          }
          break;
        case OutputStepType.APPLY_MASK:
          {
            const mask = await loadImage(masks[step.data.mask]);
            canvas = maskImage(canvas, mask);
          }
          break;
        case OutputStepType.SAVE:
          switch (step.data.format) {
            case SaveFormat.PNG:
              for (const size of step.data.sizes) {
                const scale = size.scale ?? 1;
                const scaled = scaleImage(
                  canvas,
                  size.width * scale,
                  size.height * scale,
                  ImageScaleMode.STRETCH,
                );
                const blob = await canvasToBlob(scaled);
                zip.file(size.filename, blob);
              }
              break;
            case SaveFormat.ICO:
              zip.file(
                step.data.filename,
                await writeICO(canvas, step.data.sizes),
              );
              break;
            case SaveFormat.ICNS:
              zip.file(
                step.data.filename,
                await writeICNS(canvas, step.data.sizes),
              );
              break;
          }
          break;
      }
    }
  }

  const data = await zip.generateAsync({ type: 'blob' });
  download(data, `icon.party_${Date.now()}.zip`);
}

export const SettingsStep: React.FC = () => {
  const settings = useStore($settings);

  if (!settings) {
    return null;
  }

  return (
    <div>
      <Title
        onBack={() => {
          $settings.set(undefined);
        }}
      >
        Preview settings
      </Title>
      <div>
        {settings.outputs.map(output => (
          <div className={styles.output} key={output.id}>
            <div className={styles.outputTitle}>{output.label}</div>
            <div className={styles.steps}>
              {output.steps.map(step => {
                const StepComponent = steps[step.type];

                return (
                  <StepComponent
                    step={step}
                    onChange={() => {}}
                    key={step.id}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.actions}>
        <button
          onClick={() => {
            generateIcons($file.get()!, settings);
          }}
        >
          <span>Generate icons</span>
        </button>
      </div>
    </div>
  );
};
