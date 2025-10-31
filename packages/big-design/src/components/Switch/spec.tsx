import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { createRef } from 'react';
import 'jest-styled-components';

import { Switch } from './index';

describe('render Switch', () => {
  test('checked', () => {
    const { container } = render(<Switch checked={true} onChange={() => null} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('unchecked', () => {
    const { container } = render(<Switch checked={false} onChange={() => null} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled checked', () => {
    const { container } = render(<Switch checked={true} disabled onChange={() => null} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled unchecked', () => {
    const { container } = render(<Switch checked={false} disabled onChange={() => null} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('has correct value for checked', async () => {
    render(<Switch checked={true} data-testid="switch" onChange={() => null} />);

    const input = await screen.findByTestId<HTMLInputElement>('switch');

    expect(input).toBeChecked();
  });

  test('has correct value for unchecked', async () => {
    render(<Switch checked={false} data-testid="switch" onChange={() => null} />);

    const input = await screen.findByTestId<HTMLInputElement>('switch');

    expect(input).not.toBeChecked();
  });

  test('triggers onChange when clicking the checkbox', async () => {
    const onChange = jest.fn();

    render(<Switch checked={true} data-testid="switch" onChange={onChange} />);

    const checkbox = await screen.findByTestId<HTMLInputElement>('switch');

    await userEvent.click(checkbox);

    expect(onChange).toHaveBeenCalled();
  });

  test('forwards ref', () => {
    const ref = createRef<HTMLInputElement>();

    const { container } = render(<Switch data-testid="switch" ref={ref} />);
    const input = container.querySelector('input');

    expect(input).toBe(ref.current);
  });
});
