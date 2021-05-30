import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from './index';

test('card should render text and subtitle', () => {
  expect(Card).toBeDefined();

  const props = {
    title: 'Card title',
    subTitle: 'Card subtitle',
  };

  render(<Card {...props} />);

  // expect to find props rendered
  expect(screen.getByText(props.title)).toBeInTheDocument();
  expect(screen.getByText(props.subTitle)).toBeInTheDocument();
});
