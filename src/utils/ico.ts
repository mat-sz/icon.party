import { canvasToBuffer } from './image';

export async function writeICO(
  image: CanvasImageSource,
  sizes: { width: number; height: number }[],
) {
  const entries: {
    width: number;
    height: number;
    buffer: ArrayBuffer;
    offset: number;
  }[] = [];

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  let offset =
    6 + // Header
    16 * sizes.length; // Icon entry

  for (const size of sizes) {
    canvas.width = size.width;
    canvas.height = size.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const buffer = await canvasToBuffer(canvas);
    entries.push({ ...size, buffer, offset });

    offset += buffer.byteLength;
  }

  const bytes = new Uint8Array(offset);
  const outputBuffer = bytes.buffer;
  const dataView = new DataView(outputBuffer);

  dataView.setUint16(0, 0, true); // Reserved: 0
  dataView.setUint16(2, 1, true); // Image type: 1 (icon)
  dataView.setUint16(4, entries.length, true); // Number of images

  for (let i = 0; i < entries.length; i++) {
    const current = entries[i];
    const offset = 6 + i * 16;

    dataView.setUint8(offset, current.width); // Width
    dataView.setUint8(offset + 1, current.height); // Height
    dataView.setUint8(offset + 2, 0); // Number of colors in palette (0)
    dataView.setUint8(offset + 3, 0); // Reserved (0)
    dataView.setUint16(offset + 4, 0, true); // Color planes (0)
    dataView.setUint16(offset + 6, 0, true); // Bits per pixel (0)
    dataView.setUint32(offset + 8, current.buffer.byteLength, true); // Image size in bytes
    dataView.setUint32(offset + 12, current.offset, true); // Image data offset
    bytes.set(new Uint8Array(current.buffer), current.offset);
  }

  return outputBuffer;
}
