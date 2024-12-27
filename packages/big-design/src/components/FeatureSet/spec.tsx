import { AutoAwesomeIcon } from '@bigcommerce/big-design-icons';
import { render } from '@testing-library/react';
import React from 'react';

import 'jest-styled-components';

import { FeatureSet } from './FeatureSet';

test('render feature set', () => {
  const { container } = render(
    <FeatureSet
      features={[
        { icon: <AutoAwesomeIcon />, label: 'Feature 1' },
        { icon: <AutoAwesomeIcon />, label: 'Feature 2' },
      ]}
    />,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test("doesn't render if feature prop is absent", () => {
  // @ts-expect-error ignoring since label prop is required
  const { container } = render(<FeatureSet />);

  expect(container.firstChild).toBeNull();
});

test("doesn't render if feature prop array length is empty", () => {
  const { container } = render(<FeatureSet features={[]} />);

  expect(container.firstChild).toBeNull();
});
