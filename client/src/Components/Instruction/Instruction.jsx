import React from 'react';

import { InstructionWrapper, StepWrapper, ContentWrapper, HeaderWrapper } from './Instruction.module.css';

const Instruction = ({ stepCount, headline, content }) => (
  <div className = {InstructionWrapper}>
    <div className = {StepWrapper}>
      <h1>{stepCount}</h1>
    </div>
    <div className = {ContentWrapper}>
      <div className = {HeaderWrapper}>
        {headline}
      </div>
      {content}
    </div>
  </div>
);


export default Instruction;
