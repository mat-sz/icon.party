import { OutputStepType } from '$/types';
import React from 'react';

import { AddBackground } from './AddBackground';
import { StepProps } from './types';
import { ApplyMask } from './ApplyMask';
import { MakeSquare } from './MakeSquare';
import { Save } from './Save';
import { Scale } from './Scale';
import { SetSize } from './SetSize';

export const steps: Record<OutputStepType, React.FC<StepProps<any>>> = {
  [OutputStepType.ADD_BACKGROUND]: AddBackground,
  [OutputStepType.APPLY_MASK]: ApplyMask,
  [OutputStepType.MAKE_SQUARE]: MakeSquare,
  [OutputStepType.SAVE]: Save,
  [OutputStepType.SCALE]: Scale,
  [OutputStepType.SET_SIZE]: SetSize,
};
