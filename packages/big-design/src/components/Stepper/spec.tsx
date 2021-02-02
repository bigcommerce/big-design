import 'jest-styled-components';
import { render } from '@testing-library/react';
import React from 'react';

import { Stepper } from './';

const steps: string[] = ['Login', 'Settings', 'Import'];

test('renders Stepper', () => {
  const { container } = render(<Stepper steps={steps} currentStep={1} />);
  expect(container.firstChild).toMatchSnapshot();
});

test('does not forward styles', () => {
  const { container } = render(
    <Stepper steps={steps} currentStep={0} className="test" style={{ backgroundColor: 'red' }} />,
  );
  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('renders a passed step', () => {
  const { queryByText } = render(<Stepper steps={['Test']} currentStep={0} />);

  expect(queryByText('Test')).not.toBeUndefined();
});

test('passed in state works as expected', () => {
  const { queryByRole } = render(<Stepper steps={['Test1', 'Test2', 'Test3']} currentStep={1} />);
  const lights: Array<ChildNode> = [];
  const dashes: Array<ChildNode> = [];

  queryByRole('progressbar')?.childNodes.forEach((step) => {
    lights.push(step.childNodes[0]);
    dashes.push(step.childNodes[1]);
  });

  expect(lights[0].firstChild).not.toHaveTextContent('1');
  expect(lights[1].firstChild).toHaveTextContent('2');
  expect(lights[2].firstChild).toHaveTextContent('3');

  expect(dashes[0]).toHaveStyle('background-color: #3C64F4');
  expect(dashes[1]).toHaveStyle('background-color: #D9DCE9');
  expect(dashes[2]).toHaveStyleRule('display', 'none', {
    media: '(min-width:0px)',
  });
});
