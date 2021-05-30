import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ThemeSwitch from './index';

test('ThemeSwitch should render', () => {
  expect(ThemeSwitch).toBeDefined();
  render(<ThemeSwitch />);
  // expect to find props rendered
  expect(screen.getByTitle('Theme switch')).toBeInTheDocument();
});
