import { render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { Link } from './Link';

test('render link', () => {
  const { container } = render(<Link href="#">Link</Link>);

  expect(container.firstChild).toMatchSnapshot();
});

test('forwards styles', () => {
  const { container } = render(
    <Link href="#" className="test" style={{ background: 'red' }}>
      Link
    </Link>,
  );

  expect(container.firstChild).toHaveClass('test');
  expect(container.firstChild).toHaveStyle('background: red');
});
