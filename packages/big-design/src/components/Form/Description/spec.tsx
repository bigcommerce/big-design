import { render, screen } from '@testing-library/react';
import React from 'react';
import 'jest-styled-components';

import { FormControlDescription as Description } from './Description';

test('renders description', () => {
  render(<Description>Foo</Description>);

  expect(screen.getByText('Foo')).toMatchSnapshot();
});

test('renders description with link', () => {
  render(
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

  expect(screen.getByText('Foo')).toMatchSnapshot();
});
