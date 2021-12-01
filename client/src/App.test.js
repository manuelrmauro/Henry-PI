import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title "[Recipes App]."', () => {
  render(<App />);
  const titleElement = screen.getByText('[Recipes App].')
  expect(titleElement).toBeInTheDocument();
});

test('', () => {
  render(<Nav />)

})