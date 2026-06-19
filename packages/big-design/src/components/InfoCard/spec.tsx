import { render, screen } from '@testing-library/react';
import React from 'react';
import 'jest-styled-components';

import { InfoCard } from './index';

test('renders the title', () => {
  render(<InfoCard title="Card title" />);

  expect(screen.getByText('Card title')).toBeInTheDocument();
});

test('renders the description when provided', () => {
  render(<InfoCard description="Card description" title="Card title" />);

  expect(screen.getByText('Card description')).toBeInTheDocument();
});

test('does not render a description when not provided', () => {
  render(<InfoCard title="Card title" />);

  expect(screen.queryByText('Card description')).not.toBeInTheDocument();
});

test('renders the badge when provided', () => {
  render(<InfoCard badge={{ label: 'New' }} title="Card title" />);

  expect(screen.getByText('New')).toBeInTheDocument();
});

test('does not render a badge when not provided', () => {
  render(<InfoCard title="Card title" />);

  expect(screen.queryByText('New')).not.toBeInTheDocument();
});

test('renders the image with src and alt', () => {
  render(<InfoCard img={{ alt: 'Logo', src: 'logo.png' }} title="Card title" />);

  const img = screen.getByRole('img', { name: 'Logo' });

  expect(img).toHaveAttribute('src', 'logo.png');
});

test('image alt defaults to an empty string', () => {
  const { container } = render(<InfoCard img={{ src: '/logo.png' }} title="Card title" />);

  expect(container.querySelector('img')).toHaveAttribute('alt', '');
});

test('does not render an image when not provided', () => {
  render(<InfoCard title="Card title" />);

  expect(screen.queryByRole('img')).not.toBeInTheDocument();
});

test('matches snapshot', () => {
  const { container } = render(
    <InfoCard
      badge={{ label: 'New' }}
      description="Card description"
      img={{ alt: 'Logo', src: 'logo.png' }}
      title="Card title"
    />,
  );

  expect(container.firstChild).toMatchSnapshot();
});
