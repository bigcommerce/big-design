import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from './Button';

test('sample test', () => {
  const tree = renderer.create(<Button />);

  expect(tree).toMatchSnapshot();
});
