import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React, { createRef } from 'react';
import 'jest-styled-components';

import { Fieldset } from '../Fieldset';
import { Input } from '../Input';

import { Form, FormGroup } from './index';

test('forwards ref', () => {
  const ref = createRef<HTMLFormElement>();

  const { container } = render(<Form ref={ref} />);
  const form = container.querySelector('form');

  expect(form).toBe(ref.current);
});

test('calls onSubmit', async () => {
  const onSubmit = jest.fn();

  render(<Form name="testForm" onSubmit={onSubmit} />);

  const form = await screen.findByRole('form');

  await waitFor(() => fireEvent.submit(form));

  expect(onSubmit).toHaveBeenCalled();
});

test('simple form render', () => {
  const { container } = render(
    <Form>
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

  expect(container.firstChild).toMatchSnapshot();
});

test('has margin props', () => {
  const { container, rerender } = render(<Form />);

  expect(container.firstChild).not.toHaveStyle('margin: 1rem');

  rerender(<Form margin="medium" />);

  expect(container.firstChild).toHaveStyle('margin: 1rem');
});
