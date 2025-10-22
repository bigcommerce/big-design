import { fireEvent, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';
import 'jest-styled-components';

import { Fieldset } from '../Fieldset';
import { Input } from '../Input';

import { Form, FormGroup } from './index';

test('forwards ref', () => {
  const ref = createRef<HTMLFormElement>();

  render(<Form aria-label="Test form" ref={ref} />);

  const form = screen.getByRole('form');

  expect(form).toBe(ref.current);
});

test('calls onSubmit', async () => {
  const onSubmit = jest.fn();

  render(<Form aria-label="Test form" name="testForm" onSubmit={onSubmit} />);

  const form = await screen.findByRole('form');

  fireEvent.submit(form);

  expect(onSubmit).toHaveBeenCalled();
});

test('simple form render', () => {
  render(
    <Form aria-label="Test form">
      <Fieldset
        description="Minim velit quis aute adipisicing adipisicing do do exercitation cupidatat enim ex voluptate consequat labore."
        legend="Primary contact"
      >
        <FormGroup>
          <Input
            description="This is an example description for First Name"
            label="First Name"
            placeholder="Placeholder text"
          />
        </FormGroup>

        <FormGroup>
          <Input
            description="This is an example description for Last Name. Featuring a Left Icon."
            label="Middle Name"
            placeholder="Placeholder text"
          />
        </FormGroup>
      </Fieldset>
    </Form>,
  );

  const form = screen.getByRole('form');

  expect(form).toMatchSnapshot();
});

test('has margin props', () => {
  const { rerender } = render(<Form aria-label="Test form" />);

  const form = screen.getByRole('form');

  expect(form).not.toHaveStyle('margin: 1rem');

  rerender(<Form aria-label="Test form" margin="medium" />);

  expect(form).toHaveStyle('margin: 1rem');
});
