import { render } from '@testing-library/react';
import React from 'react';

import 'jest-styled-components';

import { FeatureTag } from './FeatureTag';

test('render link', () => {
  const { container } = render(<FeatureTag href="#" label="Feature Tag" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('renders with external icon', () => {
  const { container } = render(<FeatureTag href="#" label="Feature Tag" target="_blank" />);

  expect(container.firstChild).toMatchSnapshot();
});
