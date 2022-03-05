import React from 'react';
import { markdown } from './TextRenderer.module.css';

export const TextRenderer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={markdown}>{children}</div>
);
