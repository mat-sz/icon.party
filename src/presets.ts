import { ImageScaleMode, OutputStepType, Preset, SaveFormat } from './types';

export function svgUrl(svg: string) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const masks: Record<string, string> = {
  ios: svgUrl(
    '<svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M100,68.7182051 C100,69.9139093 100,71.1074395 99.9913043,72.3009696 C99.9847826,73.3075351 99.973913,74.3141006 99.9478261,75.3184921 C99.920129,77.5191265 99.7268293,79.7145543 99.3695652,81.886169 C98.9978261,84.0601765 98.3043478,86.1646159 97.3108696,88.1320927 C95.2972476,92.0852921 92.0834623,95.2992171 88.1304348,97.3129266 C86.1638623,98.305079 84.0602691,98.9982471 81.8891304,99.3695378 C79.7152174,99.7282491 77.5195652,99.9217357 75.3195652,99.9478238 C74.3139596,99.9737988 73.308105,99.9890177 72.3021739,99.993478 C71.1065217,100 69.9130435,100 68.7195652,100 L31.2804348,100 C30.0869565,100 28.8934783,100 27.6978261,99.993478 C26.6919027,99.9897456 25.6860481,99.9752514 24.6804348,99.9499978 C22.4791037,99.9219121 20.2830235,99.7278754 18.1108696,99.3695378 C15.9391304,98.9999565 13.8347826,98.3042741 11.8695652,97.3129266 C7.91695765,95.2996615 4.70324405,92.0865692 2.68913043,88.1342667 C1.69595654,86.1655631 1.00208487,84.0596773 0.630434783,81.886169 C0.273173217,79.7152845 0.079873167,77.5205795 0.052173913,75.3206661 C0.0260869565,74.3141006 0.0130434783,73.3075351 0.00869565217,72.3009696 C-6.80219769e-14,71.1052654 -6.80219769e-14,69.9139093 -6.80219769e-14,68.7182051 L-6.80219769e-14,31.2817949 C-6.80219769e-14,30.0860907 -6.80219769e-14,28.8903865 0.00869565217,27.6946824 C0.0130434783,26.6902909 0.0260869565,25.6837254 0.052173913,24.6793339 C0.0799060567,22.4794222 0.273205889,20.2847196 0.630434783,18.113831 C1.00217391,15.9398235 1.69565217,13.8353841 2.68913043,11.8657333 C4.7027524,7.91253387 7.91653768,4.69860886 11.8695652,2.68489934 C13.8355813,1.69325138 15.9383812,1.00010324 18.1086957,0.628288186 C20.2826087,0.271750946 22.4782609,0.0782642724 24.6782609,0.050002174 C25.6847826,0.0239140832 26.6913043,0.0108700378 27.6956522,0.0065220227 C28.8913043,0 30.0869565,0 31.2782609,0 L68.7173913,0 C69.9130435,0 71.1086957,0 72.3021739,0.0065220227 C73.3080973,0.0102577353 74.3139519,0.0247519479 75.3195652,0.050002174 C77.5195652,0.0782642724 79.7152174,0.271750946 81.8869565,0.628288186 C84.0608696,1.00004348 86.1630435,1.69355189 88.1304348,2.68489934 C92.0844481,4.69799461 95.2990996,7.91202483 97.3130435,11.8657333 C98.305381,13.8338276 98.9985196,15.9389795 99.3695652,18.111657 C99.7268538,20.2832686 99.9201536,22.4786983 99.9478261,24.6793339 C99.973913,25.6858994 99.9869565,26.6924649 99.9913043,27.6968564 C100,28.8925605 100,30.0860907 100,31.2796209 L100,68.7182051 Z" fill="#000000" stroke="none" /></svg>',
  ),
};

export const presets: Preset[] = [
  {
    id: 'electron',
    label: 'Electron (Windows/MacOS/Linux)',
    settings: {
      outputs: [
        {
          id: 'ico_windows',
          label: 'Windows (.ico)',
          steps: [
            {
              id: 'make_square',
              type: OutputStepType.MAKE_SQUARE,
              data: {
                mode: ImageScaleMode.COVER,
              },
            },
            {
              id: 'mask',
              type: OutputStepType.APPLY_MASK,
              data: {
                mask: 'ios',
              },
            },
            {
              id: 'save',
              type: OutputStepType.SAVE,
              data: {
                format: SaveFormat.ICO,
                sizes: [
                  { width: 256, height: 256 },
                  { width: 128, height: 128 },
                  { width: 64, height: 64 },
                  { width: 48, height: 48 },
                  { width: 32, height: 32 },
                  { width: 16, height: 16 },
                ],
                filename: 'electron/icon.ico',
              },
            },
          ],
        },
        {
          id: 'icns_mac',
          label: 'macOS (.icns)',
          steps: [
            {
              id: 'make_square',
              type: OutputStepType.MAKE_SQUARE,
              data: {
                mode: ImageScaleMode.COVER,
              },
            },
            {
              id: 'mask',
              type: OutputStepType.APPLY_MASK,
              data: {
                mask: 'ios',
              },
            },
            {
              id: 'save',
              type: OutputStepType.SAVE,
              data: {
                format: SaveFormat.ICNS,
                sizes: [
                  { width: 512, height: 512 },
                  { width: 256, height: 256, scale: 2 },
                  { width: 256, height: 256 },
                  { width: 128, height: 128, scale: 2 },
                  { width: 128, height: 128 },
                  { width: 64, height: 64, scale: 2 },
                  { width: 64, height: 64 },
                  { width: 32, height: 32, scale: 2 },
                  { width: 32, height: 32 },
                  { width: 16, height: 16, scale: 2 },
                  { width: 16, height: 16 },
                ],
                filename: 'electron/icon.icns',
              },
            },
          ],
        },
        {
          id: 'png_linux',
          label: 'Linux (.png)',
          steps: [
            {
              id: 'make_square',
              type: OutputStepType.MAKE_SQUARE,
              data: {
                mode: ImageScaleMode.COVER,
              },
            },
            {
              id: 'mask',
              type: OutputStepType.APPLY_MASK,
              data: {
                mask: 'ios',
              },
            },
            {
              id: 'save',
              type: OutputStepType.SAVE,
              data: {
                format: SaveFormat.PNG,
                sizes: [
                  {
                    width: 512,
                    height: 512,
                    filename: 'electron/icons/512x512.png',
                  },
                  {
                    width: 256,
                    height: 256,
                    filename: 'electron/icons/256x256.png',
                  },
                  {
                    width: 128,
                    height: 128,
                    filename: 'electron/icons/128x128.png',
                  },
                  {
                    width: 64,
                    height: 64,
                    filename: 'electron/icons/64x64.png',
                  },
                  {
                    width: 48,
                    height: 48,
                    filename: 'electron/icons/48x48.png',
                  },
                  {
                    width: 32,
                    height: 32,
                    filename: 'electron/icons/32x32.png',
                  },
                  {
                    width: 16,
                    height: 16,
                    filename: 'electron/icons/16x16.png',
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  },
];
