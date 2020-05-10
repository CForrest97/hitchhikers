import React from 'react'

import { Step as StepCS } from './Step.module.css';

const Step = ({ stepCount }) => (
  <div className={StepCS}>
      {stepCount}
  </div>
);

export default Step;
