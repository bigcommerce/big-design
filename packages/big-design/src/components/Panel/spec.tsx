import { theme } from '@bigcommerce/big-design-theme';
import { fireEvent, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';
import 'jest-styled-components';

import { Text } from '../Typography';

import { Panel } from './Panel';

test('render panel', () => {
  render(
    <Panel data-testid="panel">
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur
      officia ex. Ipsum eiusmod fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse
      deserunt nostrud ipsum id adipisicing enim velit labore. Nulla exercitation laborum laboris
      Lorem irure sit esse nulla mollit aliquip consectetur velit
    </Panel>,
  );

  const panel = screen.getByTestId('panel');

  expect(panel).toMatchSnapshot();
});

test('render panel with only a heading and no content', () => {
  render(<Panel data-testid="panel" header="Test Header" />);

  const panel = screen.getByTestId('panel');

  expect(panel).toMatchSnapshot();
});

test('does not forward styles', () => {
  render(
    <Panel className="test" data-testid="panel" style={{ background: 'red' }}>
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur
      officia ex. Ipsum eiusmod fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse
      deserunt nostrud ipsum id adipisicing enim velit labore. Nulla exercitation laborum laboris
      Lorem irure sit esse nulla mollit aliquip consectetur velit
    </Panel>,
  );

  const panel = screen.getByTestId('panel');

  expect(screen.queryByText('test')).not.toBeInTheDocument();
  expect(panel).not.toHaveStyle('background: red');
});

test('renders a header and action', () => {
  render(
    <Panel action={{ text: 'Test Action' }} header="Test Header">
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur
      officia ex. Ipsum eiusmod fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse
      deserunt nostrud ipsum id adipisicing enim velit labore. Nulla exercitation laborum laboris
      Lorem irure sit esse nulla mollit aliquip consectetur velit
    </Panel>,
  );

  const header = screen.getByRole('heading');

  expect(header).toBeInTheDocument();
  expect(header).toHaveTextContent('Test Header');

  const actionButton = screen.getByRole('button');

  expect(actionButton).toBeInTheDocument();
  expect(actionButton).toHaveTextContent('Test Action');
});

test('renders a badge and header', () => {
  render(
    <Panel badge={{ label: 'danger', variant: 'danger' }} header="Test Header">
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur
      officia ex. Ipsum eiusmod fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse
      deserunt nostrud ipsum id adipisicing enim velit labore. Nulla exercitation laborum laboris
      Lorem irure sit esse nulla mollit aliquip consectetur velit
    </Panel>,
  );

  const header = screen.getByRole('heading');

  expect(header).toBeInTheDocument();

  const badge = screen.getByText('danger');

  expect(badge).toBeInTheDocument();
});

describe('description', () => {
  test('renders string description', async () => {
    render(
      <Panel action={{ text: 'Test Action' }} description="Test Description" header="Test Header">
        Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur
        officia ex. Ipsum eiusmod fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse
        deserunt nostrud ipsum id adipisicing enim velit labore. Nulla exercitation laborum laboris
        Lorem irure sit esse nulla mollit aliquip consectetur velit
      </Panel>,
    );

    const description = await screen.findByText('Test Description');

    expect(description).toBeInTheDocument();
  });

  test('renders ReactNode description', async () => {
    render(
      <Panel
        action={{ text: 'Test Action' }}
        description={<Text>Test Description</Text>}
        header="Test Header"
      >
        Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur
        officia ex. Ipsum eiusmod fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse
        deserunt nostrud ipsum id adipisicing enim velit labore. Nulla exercitation laborum laboris
        Lorem irure sit esse nulla mollit aliquip consectetur velit
      </Panel>,
    );

    const description = await screen.findByText('Test Description');

    expect(description).toBeInTheDocument();
  });
});

test('action options get forwarded to button', () => {
  const onClick = jest.fn();

  render(
    <Panel action={{ text: 'Test Action', onClick }} header="Test Header">
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur
      officia ex. Ipsum eiusmod
    </Panel>,
  );

  fireEvent.click(screen.getByRole('button'));

  expect(onClick).toHaveBeenCalled();
});

test('forwards data attributes', () => {
  render(
    <Panel data-testid="panel" header="Test Header">
      Dolore proident eiusmod sint est enim laboris
    </Panel>,
  );

  const panel = screen.getByTestId('panel');

  expect(panel).toBeInTheDocument();
});

test('forwards ref', () => {
  const ref = createRef<HTMLDivElement>();

  render(<Panel data-testid="panel" ref={ref} />);

  const panel = screen.getByTestId('panel');

  expect(panel).toBe(ref.current);
});

test('ignores padding props', () => {
  render(
    // @ts-expect-error - ignoring since paddingRight is not a valid prop
    <Panel data-testid="panel" header="Test Header" paddingRight="xxxLarge">
      Dolore proident eiusmod sint est enim laboris
    </Panel>,
  );

  const panel = screen.getByTestId('panel');

  expect(panel).not.toHaveStyle(`padding-right: ${theme.spacing.xxxLarge}`);
});

test("panel action doesn't go to full width", () => {
  render(
    <Panel action={{ text: 'Test Action' }} header="Test Header">
      Test
    </Panel>,
  );

  const button = screen.getByRole('button');

  expect(button).toHaveStyle('width: auto');
});

test('forwards headerId to heading', () => {
  render(
    <Panel header="Test Header" headerId="test-header">
      Test
    </Panel>,
  );

  expect(screen.getByText('Test Header')).toHaveAttribute('id', 'test-header');
});

test('applies the right border radius values', async () => {
  render(
    <Panel role="region">
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur
      officia ex. Ipsum eiusmod fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse
      deserunt nostrud ipsum id adipisicing enim velit labore. Nulla exercitation laborum laboris
      Lorem irure sit esse nulla mollit aliquip consectetur velit
    </Panel>,
  );

  const panel = await screen.findByRole('region');

  expect(panel).toHaveStyleRule('border-radius', `${theme.borderRadius.none}`);
  expect(panel).toHaveStyleRule('border-radius', theme.borderRadius.normal, {
    media: `(min-width:${theme.breakpointValues.tablet})`,
  });
});
