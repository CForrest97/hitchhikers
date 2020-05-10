import React from 'react'

import { Card as CardCS } from './Card.module.css';

const Card = ({ children }) => (
  <div className={CardCS}>
      {children}
  </div>
);

export default Card;
