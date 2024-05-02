import { canvasToBuffer } from './image';

function strToInt(str: string) {
  let out = 0;
  for (let i = 0; i < str.length; i++) {
    if (i !== 0) {
      out <<= 8;
    }
    out += str.charCodeAt(i);
  }
  return out;
}

const iconTypes: {
  type: number;
  width: number;
  height: number;
  format: 'png' | 'argb';
  scale?: number;
}[] = [
  {
    type: strToInt('ic04'),
    width: 16,
    height: 16,
    format: 'argb',
  },
  {
    type: strToInt('ic05'),
    width: 32,
    height: 32,
    format: 'argb',
  },
  {
    type: strToInt('ic07'),
    width: 128,
    height: 128,
    format: 'png',
  },
  {
    type: strToInt('ic08'),
    width: 256,
    height: 256,
    format: 'png',
  },
  {
    type: strToInt('ic09'),
    width: 512,
    height: 512,
    format: 'png',
  },
  {
    type: strToInt('ic10'),
    width: 512,
    height: 512,
    scale: 2,
    format: 'png',
  },
  {
    type: strToInt('ic11'),
    width: 16,
    height: 16,
    scale: 2,
    format: 'png',
  },
  {
    type: strToInt('ic12'),
    width: 32,
    height: 32,
    scale: 2,
    format: 'png',
  },
  {
    type: strToInt('ic13'),
    width: 128,
    height: 128,
    scale: 2,
    format: 'png',
  },
  {
    type: strToInt('ic14'),
    width: 256,
    height: 256,
    scale: 2,
    format: 'png',
  },
];

function compressArgb(data: Uint8Array) {
  const output = [];
  let i = 0;

  while (i < data.byteLength) {
    const sequence = [];
    let count = 0;

    while (count <= 0x7f && i < data.byteLength) {
      if (
        i + 2 < data.byteLength &&
        data[i] === data[i + 1] &&
        data[i] === data[i + 2]
      ) {
        break;
      }

      sequence.push(data[i]);
      i++;
      count++;
    }

    if (sequence.length) {
      output.push(count - 1);
      output.push(...sequence);
    }

    if (i >= data.byteLength) {
      break;
    }

    const repeatedByte = data[i];
    count = 0;
    while (count <= 0x7f && i < data.byteLength && data[i] === repeatedByte) {
      i++;
      count++;
    }

    if (count >= 3) {
      output.push(0x80 + count - 3);
      output.push(repeatedByte);
    } else {
      output.push(count - 1);
      for (let j = 0; j < count; j++) {
        output.push(repeatedByte);
      }
    }
  }

  return new Uint8Array(output);
}

function canvasToArgb(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  const array = new Uint8Array(canvas.width * canvas.height * 4);

  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const channelLength = canvas.width * canvas.height;
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const position = y * canvas.width + x;
      const offset = position * 4;
      array[position] = data[offset + 3]; // A
      array[channelLength + position] = data[offset]; // R
      array[channelLength * 2 + position] = data[offset + 1]; // G
      array[channelLength * 3 + position] = data[offset + 2]; // B
    }
  }

  const compressed = [
    compressArgb(array.slice(0, channelLength)),
    compressArgb(array.slice(channelLength, channelLength * 2)),
    compressArgb(array.slice(channelLength * 2, channelLength * 3)),
    compressArgb(array.slice(channelLength * 3, channelLength * 4)),
  ];
  const output = new Uint8Array(
    compressed.reduce((total, current) => total + current.byteLength, 0) + 4,
  );
  const dataView = new DataView(output.buffer);
  dataView.setUint32(0, strToInt('ARGB'), false);
  let offset = 4;
  for (const array of compressed) {
    output.set(array, offset);
    offset += array.byteLength;
  }
  return output.buffer;
}

export async function writeICNS(
  image: CanvasImageSource,
  sizes: { width: number; height: number; scale?: number }[],
) {
  const entries: {
    type: number;
    buffer: ArrayBuffer;
  }[] = [];

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  let totalLength = 8; // Header

  for (const size of sizes) {
    const iconType = iconTypes.find(
      type =>
        type.width === size.width &&
        type.height === size.height &&
        (type.scale ?? 1) === (size.scale ?? 1),
    );
    if (!iconType) {
      continue;
    }

    const scale = size.scale ?? 1;
    canvas.width = size.width * scale;
    canvas.height = size.height * scale;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    let buffer: ArrayBuffer;
    switch (iconType.format) {
      case 'png':
        buffer = await canvasToBuffer(canvas);
        break;
      case 'argb':
        buffer = canvasToArgb(canvas);
        break;
    }

    if (!buffer) {
      continue;
    }

    entries.push({ buffer, type: iconType.type });
    totalLength += 8 + buffer.byteLength;
  }

  const bytes = new Uint8Array(totalLength);
  const outputBuffer = bytes.buffer;
  const dataView = new DataView(outputBuffer);

  dataView.setUint32(0, strToInt('icns'), false);
  dataView.setUint32(4, totalLength, false);

  let offset = 8;
  for (let i = 0; i < entries.length; i++) {
    const current = entries[i];
    const iconLength = current.buffer.byteLength;

    dataView.setUint32(offset, current.type, false); // Icon type
    dataView.setUint32(offset + 4, iconLength + 8, false); // Icon byte length (including type and length)
    bytes.set(new Uint8Array(current.buffer), offset + 8);

    offset += 8 + iconLength;
  }

  return outputBuffer;
}
