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
    const { container } = render(<Switch checked={true} onChange={() => null} disabled />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled unchecked', () => {
    const { container } = render(<Switch checked={false} onChange={() => null} disabled />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('has correct value for checked', () => {
    const { getByTestId } = render(<Switch checked={true} onChange={() => null} data-testid="switch" />);
    const input = getByTestId('switch') as HTMLInputElement;

    expect(input.checked).toBe(true);
  });

  test('has correct value for unchecked', () => {
    const { getByTestId } = render(<Switch checked={false} onChange={() => null} data-testid="switch" />);
    const input = getByTestId('switch') as HTMLInputElement;

    expect(input.checked).toBe(false);
  });

  test('triggers onChange when clicking the checkbox', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<Switch checked={true} onChange={onChange} data-testid="switch" />);
    const checkbox = getByTestId('switch') as HTMLInputElement;

    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalled();
  });

  test('forwards ref', () => {
    const ref = createRef<HTMLInputElement>();

    const { container } = render(<Switch ref={ref} data-testid="switch" />);
    const input = container.querySelector('input');

    expect(input).toBe(ref.current);
  });
});
