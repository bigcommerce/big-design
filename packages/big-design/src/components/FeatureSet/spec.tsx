import { AutoAwesomeIcon } from '@bigcommerce/big-design-icons';
import { render, screen } from '@testing-library/react';
import React from 'react';

import 'jest-styled-components';

import { FeatureSet } from './index';

test('render feature set', () => {
  render(<FeatureSet tags={[{ label: 'Feature 1' }, { label: 'Feature 2' }]} />);

  expect(screen.getByRole('list')).toMatchSnapshot();
});

test("doesn't forward styles", () => {
  render(
    <FeatureSet
      className="test"
      style={{ background: 'red' }}
      tags={[{ label: 'Feature 1' }, { label: 'Feature 2' }]}
    />,
  );

  expect(screen.queryByText('test')).not.toBeInTheDocument();
  expect(screen.getByRole('list')).not.toHaveStyle('background: red');
});

test("doesn't render if tags are empty", () => {
  render(<FeatureSet tags={[]} />);

  expect(screen.queryByRole('list')).not.toBeInTheDocument();
});

test('allows margins to be set', () => {
  render(<FeatureSet margin="medium" tags={[{ label: 'Feature 1' }, { label: 'Feature 2' }]} />);

  expect(screen.getByRole('list')).toHaveStyle('margin: 1rem');
});

test('renders tag with icon', () => {
  render(
    <FeatureSet
      tags={[{ label: 'Feature 1', icon: <AutoAwesomeIcon /> }, { label: 'Feature 2' }]}
    />,
  );

  const listItem = screen.getByRole('listitem', { name: 'Feature 1' });

  // eslint-disable-next-line testing-library/no-node-access
  expect(listItem.querySelector('svg')).toBeInTheDocument();
});

test("doesn't render tag with invalid label", () => {
  render(<FeatureSet tags={[{ label: '' }]} />);

  expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
});
