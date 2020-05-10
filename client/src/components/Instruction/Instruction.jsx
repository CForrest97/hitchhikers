import React from 'react';

import Card from '../../elements/Card'
import Step from '../../elements/Step'

import { Instruction as InstructionCS, Content, Top, Body } from './Instruction.module.css';

const Instruction = ({ stepCount, heading, content, children }) => (
    <div className={InstructionCS}>
        <Card>
            <div className={Top}>
                <Step stepCount={stepCount} />
                <div className={Content}>
                    {heading}
                </div>
            </div>
            <div className={Body}>
                {children}
            </div>
        </Card>
    </div>
);

export default Instruction;