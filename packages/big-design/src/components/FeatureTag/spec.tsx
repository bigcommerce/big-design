import { AutoAwesomeIcon } from '@bigcommerce/big-design-icons';
import { render } from '@testing-library/react';
import React from 'react';

import 'jest-styled-components';

import { FeatureTag } from './FeatureTag';

test('render feature tag', () => {
  const { container } = render(<FeatureTag label="Feature Tag" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('renders with icon', () => {
  const { container } = render(<FeatureTag icon={<AutoAwesomeIcon />} label="Feature Tag" />);

  expect(container.firstChild).toMatchSnapshot();
});

test("doesn't render if label prop is absent", () => {
  // @ts-expect-error ignoring since label prop is required
  const { container } = render(<FeatureTag />);

  expect(container.firstChild).toBeNull();
});
