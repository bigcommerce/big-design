import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Stepper } from './';

const steps: string[] = ['Login', 'Settings', 'Import'];

test('renders Stepper', () => {
  render(<Stepper currentStep={1} steps={steps} />);

  expect(screen.getByRole('progressbar')).toMatchSnapshot();
});

test('does not forward styles', () => {
  render(
    <Stepper className="test" currentStep={0} steps={steps} style={{ backgroundColor: 'red' }} />,
  );

  expect(screen.queryByRole('progressbar', { name: /test/i })).not.toBeInTheDocument();
  expect(screen.getByRole('progressbar')).not.toHaveStyle('background: red');
});

test('renders a passed step', () => {
  render(<Stepper currentStep={0} steps={['Test']} />);

  expect(screen.getByText('Test')).toBeInTheDocument();
});

test('passed in state works as expected', () => {
  render(<Stepper currentStep={1} steps={['Test1', 'Test2', 'Test3']} />);

  const lights: ChildNode[] = [];
  const dashes: ChildNode[] = [];

  screen.queryByRole('progressbar')?.childNodes.forEach((step) => {
    lights.push(step.childNodes[0]);
    dashes.push(step.childNodes[1]);
  });

  // eslint-disable-next-line testing-library/no-node-access
  expect(lights[0].firstChild).not.toHaveTextContent('1');
  // eslint-disable-next-line testing-library/no-node-access
  expect(lights[1].firstChild).toHaveTextContent('2');
  // eslint-disable-next-line testing-library/no-node-access
  expect(lights[2].firstChild).toHaveTextContent('3');

  expect(dashes[0]).toHaveStyle('background-color: #3C64F4');
  expect(dashes[1]).toHaveStyle('background-color: #D9DCE9');
  expect(dashes[2]).toHaveStyleRule('display', 'none', {
    media: '(min-width:0px)',
  });
});
