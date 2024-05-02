import React from 'react';
import { useStore } from '@nanostores/react';
import { BsGithub } from 'react-icons/bs';

import './index.scss';
import { $step } from '$/store';
import { Step } from '$/types';
import { HomeStep } from './views/home';
import { PresetStep } from './views/preset';
import { SettingsStep } from './views/settings';

export const App: React.FC = () => {
  const step = useStore($step);

  return (
    <div className="app">
      <div className="bg" />
      <div className="header">
        <div className="content">
          <h1>icon.party</h1>
          <div>
            <a
              href="https://github.com/mat-sz/icon.party"
              rel="noreferrer nooopener"
              target="_blank"
            >
              <BsGithub />
            </a>
          </div>
        </div>
      </div>
      <div className="page">
        {step === Step.SELECT_FILE && <HomeStep />}
        {step === Step.SELECT_PRESET && <PresetStep />}
        {step === Step.MODIFY_SETTINGS && <SettingsStep />}
      </div>
    </div>
  );
};
