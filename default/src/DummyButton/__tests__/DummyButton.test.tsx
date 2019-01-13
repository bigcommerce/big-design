import 'jest-styled-components';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { DummyButton } from '../DummyButton';

describe('DummyButton', () => {
  test('dummy test', () => {
    const button = renderer.create(<DummyButton variant="primary">Click me</DummyButton>);

    const tree = button.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
