import { render, screen } from '@testing-library/react';
import App from './App';
import {BrowserRouter} from 'react-router-dom'

test('renders link to App', () => {
  render(<BrowserRouter><App/></BrowserRouter>);
  const linkElement = screen.getByText('Enter')
  expect(linkElement).toBeInTheDocument();
});

