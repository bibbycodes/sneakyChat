import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


test('renders learn react link', () => {
  const { sneakychat } = render(<App />);
  const message = sneakychat(/Hello!/i);
  expect(message).toBeInTheDocument();
});
