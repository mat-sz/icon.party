export enum BackgroundType {
  SOLID_COLOR,
  GRADIENT,
}

export interface BackgroundBase {
  type: BackgroundType;
  data: unknown;
}

export interface BackgroundSolidColor extends BackgroundBase {
  type: BackgroundType.SOLID_COLOR;
  data: {
    color: string;
  };
}

export interface BackgroundGradient extends BackgroundBase {
  type: BackgroundType.GRADIENT;
  data: {
    stops: {
      percent: number;
      color: string;
    }[];
    type: 'linear' | 'radial';
    angle: number;
  };
}

export type Background = BackgroundSolidColor | BackgroundGradient;

export enum OutputStepType {
  MAKE_SQUARE,
  ADD_BACKGROUND,
  SCALE,
  SET_SIZE,
  APPLY_MASK,
  SAVE,
}

export enum ImageScaleMode {
  STRETCH,
  CENTER,
  COVER,
  CONTAIN,
}

export interface OutputStepBase {
  id: string;
  type: OutputStepType;
  data: unknown;
}

export interface OutputStepMakeSquare extends OutputStepBase {
  type: OutputStepType.MAKE_SQUARE;
  data: {
    mode: ImageScaleMode;
  };
}

export interface OutputStepAddBackground extends OutputStepBase {
  type: OutputStepType.ADD_BACKGROUND;
  data: Background;
}

export interface OutputStepScale extends OutputStepBase {
  type: OutputStepType.SCALE;
  data: {
    width: number;
    height: number;
    mode: ImageScaleMode;
  };
}

export interface OutputStepSetSize extends OutputStepBase {
  type: OutputStepType.SET_SIZE;
  data: {
    width: number;
    height: number;
  };
}

export interface OutputStepApplyMask extends OutputStepBase {
  type: OutputStepType.APPLY_MASK;
  data: {
    mask: string;
  };
}

export enum SaveFormat {
  PNG,
  ICO,
  ICNS,
}

export interface SaveOptionsBase {
  format: SaveFormat;
}

/**
 * Options for file formats that only support single size per file. (PNG)
 */
export interface SaveOptionsSingleSize extends SaveOptionsBase {
  format: SaveFormat.PNG;
  sizes: {
    width: number;
    height: number;
    filename: string;
  }[];
}

/**
 * Options for file formats that support multiple sizes per file. (ICO/ICNS)
 */
export interface SaveOptionsMultipleSize extends SaveOptionsBase {
  format: SaveFormat.ICO | SaveFormat.ICNS;
  sizes: {
    width: number;
    height: number;
    scale?: number;
  }[];
  filename: string;
}

export type SaveOptions = SaveOptionsSingleSize | SaveOptionsMultipleSize;

export interface OutputStepSave extends OutputStepBase {
  type: OutputStepType.SAVE;
  data: SaveOptions;
}

export type OutputStep =
  | OutputStepMakeSquare
  | OutputStepAddBackground
  | OutputStepScale
  | OutputStepSetSize
  | OutputStepApplyMask
  | OutputStepSave;

export interface Output {
  id: string;
  label: string;
  steps: OutputStep[];
}

export interface Settings {
  outputs: Output[];
}

export interface Preset {
  id: string;
  title: string;
  description?: string;
  settings: Settings;
}

export enum Step {
  SELECT_FILE,
  SELECT_PRESET,
  MODIFY_SETTINGS,
}
