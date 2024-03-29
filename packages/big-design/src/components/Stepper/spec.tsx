import 'jest-styled-components';
import { render } from '@testing-library/react';
import React from 'react';

import { Stepper } from './';

const steps: string[] = ['Login', 'Settings', 'Import'];

test('renders Stepper', () => {
  const { container } = render(<Stepper currentStep={1} steps={steps} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('does not forward styles', () => {
  const { container } = render(
    <Stepper className="test" currentStep={0} steps={steps} style={{ backgroundColor: 'red' }} />,
  );

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('renders a passed step', () => {
  const { queryByText } = render(<Stepper currentStep={0} steps={['Test']} />);

  expect(queryByText('Test')).toBeDefined();
});

test('passed in state works as expected', () => {
  const { queryByRole } = render(<Stepper currentStep={1} steps={['Test1', 'Test2', 'Test3']} />);
  const lights: ChildNode[] = [];
  const dashes: ChildNode[] = [];

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
