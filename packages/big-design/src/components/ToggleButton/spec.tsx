import { fireEvent, render } from '@test/utils';
import 'jest-styled-components';
import React from 'react';

import { ToggleButton } from './ToggleButton';

test('render selected and enabled', () => {
  const { container } = render(<ToggleButton selected={true}></ToggleButton>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render unselected and enabled', () => {
  const { container } = render(<ToggleButton selected={false}></ToggleButton>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render selected and disabled', () => {
  const { container } = render(<ToggleButton selected={true} disabled></ToggleButton>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render unselected and disabled', () => {
  const { container } = render(<ToggleButton selected={false} disabled></ToggleButton>);

  expect(container.firstChild).toMatchSnapshot();
});

test('does not forward styles', () => {
  const { container } = render(<ToggleButton className="test" selected={true} style={{ backgroundColor: 'orange' }} />);

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.style.backgroundColor).toBe('');
});

test('triggers onClick', () => {
  const onClick = jest.fn();

  const { container } = render(<ToggleButton selected={true} onClick={onClick}></ToggleButton>);
  const button = container.firstChild as HTMLElement;

  fireEvent.click(button);

  expect(onClick).toHaveBeenCalled();
});
