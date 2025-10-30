import { render, screen } from '@testing-library/react';
import React from 'react';
import 'jest-styled-components';

import { FormControlDescription as Description } from './Description';

test('renders description', () => {
  const { container } = render(<Description>Foo</Description>);

  expect(container.firstChild).toMatchSnapshot();
});

test('renders description with link', () => {
  const { container } = render(
    <Description
      link={{
        text: 'more',
        href: 'f',
        target: 't',
      }}
    >
      Foo
    </Description>,
  );

  expect(container.firstChild).toMatchSnapshot();
});
