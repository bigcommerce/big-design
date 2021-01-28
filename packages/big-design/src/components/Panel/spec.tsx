import { theme } from '@bigcommerce/big-design-theme';
import React, { createRef } from 'react';
import 'jest-styled-components';

import { fireEvent, render } from '@test/utils';

import { Panel } from './Panel';

test('render panel', () => {
  const { container } = render(
    <Panel>
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur officia ex. Ipsum eiusmod
      fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse deserunt nostrud ipsum id adipisicing enim velit
      labore. Nulla exercitation laborum laboris Lorem irure sit esse nulla mollit aliquip consectetur velit
    </Panel>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('does not forward styles', () => {
  const { container } = render(
    <Panel className="test" style={{ background: 'red' }}>
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur officia ex. Ipsum eiusmod
      fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse deserunt nostrud ipsum id adipisicing enim velit
      labore. Nulla exercitation laborum laboris Lorem irure sit esse nulla mollit aliquip consectetur velit
    </Panel>,
  );

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('renders a header and action', () => {
  const { getByRole } = render(
    <Panel header="Test Header" action={{ text: 'Test Action' }}>
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur officia ex. Ipsum eiusmod
      fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse deserunt nostrud ipsum id adipisicing enim velit
      labore. Nulla exercitation laborum laboris Lorem irure sit esse nulla mollit aliquip consectetur velit
    </Panel>,
  );

  const header = getByRole('heading');

  expect(header).toBeInTheDocument();
  expect(header.textContent).toBe('Test Header');

  const actionButton = getByRole('button');

  expect(actionButton).toBeInTheDocument();
  expect(actionButton.textContent).toBe('Test Action');
});

test('action options get forwarded to button', () => {
  const onClick = jest.fn();

  const { getByRole } = render(
    <Panel header="Test Header" action={{ text: 'Test Action', onClick }}>
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur officia ex. Ipsum eiusmod
    </Panel>,
  );

  fireEvent.click(getByRole('button'));

  expect(onClick).toHaveBeenCalled();
});

test('forwards data attributes', () => {
  const { getByTestId } = render(
    <Panel header="Test Header" data-testid="panel">
      Dolore proident eiusmod sint est enim laboris
    </Panel>,
  );

  const panel = getByTestId('panel');

  expect(panel).toBeInTheDocument();
});

test('forwards ref', () => {
  const ref = createRef<HTMLDivElement>();

  const { container } = render(<Panel ref={ref} />);
  const panel = container.querySelector('div');

  expect(panel).toBe(ref.current);
});

test('ignores padding props', () => {
  const { getByTestId } = render(
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore - ignoring since paddingRight is not a valid prop
    <Panel header="Test Header" data-testid="panel" paddingRight="xxxLarge">
      Dolore proident eiusmod sint est enim laboris
    </Panel>,
  );

  const panel = getByTestId('panel');

  expect(panel).not.toHaveStyle(`padding-right: ${theme.spacing.xxxLarge}`);
});

test("panel action doesn't go to full width", () => {
  const { getByRole } = render(
    <Panel header="Test Header" action={{ text: 'Test Action' }}>
      Test
    </Panel>,
  );

  const button = getByRole('button');

  expect(button).toHaveStyle('width: auto');
});

test('forwards headerId to heading', () => {
  const { getByText } = render(
    <Panel header="Test Header" headerId="test-header">
      Test
    </Panel>,
  );

  expect(getByText('Test Header')).toHaveAttribute('id', 'test-header');
});
