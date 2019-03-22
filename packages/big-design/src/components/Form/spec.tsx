import 'jest-styled-components';
import React from 'react';
import { fireEvent, render } from 'react-testing-library';

import { Input } from '../Input';

import { Form } from './index';

test('forwards ref', () => {
  const ref = React.createRef<HTMLFormElement>();

  const { container } = render(<Form ref={ref} />);
  const form = container.querySelector('form');

  expect(form).toBe(ref.current);
});

test('calls onSubmit', () => {
  const onSubmit = jest.fn();
  const { container } = render(<Form onSubmit={onSubmit} />);
  const form = container.querySelector('form') as HTMLFormElement;

  fireEvent.submit(form);

  expect(onSubmit).toHaveBeenCalled();
});

test('simple form render', () => {
  const { container } = render(
    <Form>
      <Form.Fieldset
        legend="Primary contact"
        description="Minim velit quis aute adipisicing adipisicing do do exercitation cupidatat enim ex voluptate consequat labore."
      >
        <Form.Row>
          <Input
            label="First Name"
            description="This is an example description for First Name"
            placeholder="Placeholder text"
          />
        </Form.Row>

        <Form.Row>
          <Input
            label="Middle Name"
            description="This is an example description for Last Name. Featuring a Left Icon."
            placeholder="Placeholder text"
          />
        </Form.Row>
      </Form.Fieldset>
    </Form>,
  );

  expect(container.firstChild).toMatchSnapshot();
});
