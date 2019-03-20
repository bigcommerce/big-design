import 'jest-styled-components';
import React from 'react';
import { render } from 'react-testing-library';

import { Link } from './Link';

test('render link', () => {
  const { container } = render(<Link href="#">Link</Link>);

  expect(container.firstChild).toMatchSnapshot();
});

test('does not forward styles', () => {
  const { container } = render(
    <Link href="#" className="test" style={{ background: 'red' }}>
      Link
    </Link>,
  );

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});
