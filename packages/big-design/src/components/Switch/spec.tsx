import React, { createRef } from 'react';
import 'jest-styled-components';

import { fireEvent, render } from '@test/utils';

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

  test('has correct value for checked', () => {
    const { getByTestId } = render(
      <Switch checked={true} data-testid="switch" onChange={() => null} />,
    );
    const input = getByTestId('switch') as HTMLInputElement;

    expect(input.checked).toBe(true);
  });

  test('has correct value for unchecked', () => {
    const { getByTestId } = render(
      <Switch checked={false} data-testid="switch" onChange={() => null} />,
    );
    const input = getByTestId('switch') as HTMLInputElement;

    expect(input.checked).toBe(false);
  });

  test('triggers onChange when clicking the checkbox', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Switch checked={true} data-testid="switch" onChange={onChange} />,
    );
    const checkbox = getByTestId('switch') as HTMLInputElement;

    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalled();
  });

  test('forwards ref', () => {
    const ref = createRef<HTMLInputElement>();

    const { container } = render(<Switch data-testid="switch" ref={ref} />);
    const input = container.querySelector('input');

    expect(input).toBe(ref.current);
  });
});
