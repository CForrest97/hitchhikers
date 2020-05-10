import React from 'react'

import { Title as TitleCS } from './Title.module.css';

const Title = ({ children }) => (
  <div className={TitleCS}>
      {children}
  </div>
);

export default Title;
