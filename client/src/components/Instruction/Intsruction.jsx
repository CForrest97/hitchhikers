import React from 'react';

import Card from '../../elements/Card'

const Instruction = ({ stepCount, heading, content }) => (
    <Card>
        {stepCount} {heading}
        {content}
    </Card>
);

export default Instruction;