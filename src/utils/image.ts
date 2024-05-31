import { ImageScaleMode } from '$/types';

export function loadImage(url: string): Promise<HTMLImageElement> {
  const source = new Image();
  source.src = url;

  return new Promise(resolve => {
    const onload = () => {
      resolve(source);
    };

    if (source.complete && source.height > 0) {
      onload();
    } else {
      source.onload = onload;
    }
  });
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string = 'image/png',
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (!blob) {
          reject();
          return;
        }

        resolve(blob);
      },
      type,
      quality,
    );
  });
}

export async function canvasToBuffer(
  canvas: HTMLCanvasElement,
  type: string = 'image/png',
  quality?: number,
) {
  const blob = await canvasToBlob(canvas, type, quality);
  return await blob.arrayBuffer();
}

export const imageModeOptions = [
  { key: 'stretch', label: 'Stretch' },
  { key: 'center', label: 'Center' },
  { key: 'cover', label: 'Cover' },
  { key: 'contain', label: 'Contain' },
];

export function imageToCanvas(image: HTMLImageElement) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  ctx.drawImage(image, 0, 0);
  return canvas;
}

export function scaleImage(
  source: HTMLCanvasElement,
  width: number,
  height: number,
  mode?: ImageScaleMode,
) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (mode === ImageScaleMode.CONTAIN || mode === ImageScaleMode.COVER) {
    let scale = 1;
    let imageHeight = 0;
    let imageWidth = 0;
    let x = 0;
    let y = 0;

    let cond = source.width > source.height;
    if (mode === ImageScaleMode.COVER) {
      cond = !cond;
    }

    if (cond) {
      scale = height / source.height;
      imageWidth = source.width * scale;
      imageHeight = height;
      x = (-1 * (imageWidth - height)) / 2;
    } else {
      scale = width / source.width;
      imageWidth = width;
      imageHeight = source.height * scale;
      y = (-1 * (imageHeight - width)) / 2;
    }
    ctx.drawImage(source, x, y, imageWidth, imageHeight);
  } else if (mode === ImageScaleMode.CENTER) {
    const x = width / 2 - source.width / 2;
    const y = height / 2 - source.height / 2;
    ctx.drawImage(source, x, y, source.width, source.height);
  } else {
    ctx.drawImage(
      source,
      0,
      0,
      source.width,
      source.height,
      0,
      0,
      width,
      height,
    );
  }

  return canvas;
}

export function maskImage(source: HTMLCanvasElement, mask: HTMLImageElement) {
  const canvas = document.createElement('canvas');
  canvas.width = source.width;
  canvas.height = source.height;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(source, 0, 0, source.width, source.height);

  ctx.globalCompositeOperation = 'destination-in';
  ctx.drawImage(mask, 0, 0, source.width, source.height);
  ctx.globalCompositeOperation = 'source-over';

  return canvas;
}

export function padImage(source: HTMLCanvasElement, amount: number) {
  const canvas = document.createElement('canvas');
  canvas.width = source.width;
  canvas.height = source.height;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(
    source,
    source.width * amount,
    source.height * amount,
    source.width * (1 - amount * 2),
    source.height * (1 - amount * 2),
  );
  return canvas;
}
