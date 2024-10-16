import { AutoAwesomeIcon } from '@bigcommerce/big-design-icons';
import { theme } from '@bigcommerce/big-design-theme';
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

test('renders as active', () => {
  const { container } = render(
    <FeatureTag icon={<AutoAwesomeIcon />} isActive={true} label="Feature Tag" />,
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.primary10}`);
  expect(container.firstChild).toHaveStyle(`color: ${theme.colors.primary50}`);
  expect(container.firstChild).toHaveStyle(`fill: ${theme.colors.primary}`);
});

test("doesn't render if label prop is absent", () => {
  // @ts-expect-error ignoring since label prop is required
  const { container } = render(<FeatureTag />);

  expect(container.firstChild).toBeNull();
});
