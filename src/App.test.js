import { render, screen } from '@testing-library/react';
import App from './App';

test('renders HelpUp brand and navigation', () => {
  render(<App />);
  const logoElements = screen.getAllByText(/HelpUp/i);
  expect(logoElements.length).toBeGreaterThan(0);
});

test('renders main hero call-to-action on homepage', () => {
  render(<App />);
  const heroHeading = screen.getByText(/Verified Local Tradespeople/i);
  expect(heroHeading).toBeInTheDocument();
});
