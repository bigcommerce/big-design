import { theme } from '@bigcommerce/big-design-theme';
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { createRef } from 'react';
import 'jest-styled-components';

import { Text } from '../Typography';

import { Panel } from './Panel';

test('render panel', () => {
  const { container } = render(
    <Panel>
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur
      officia ex. Ipsum eiusmod fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse
      deserunt nostrud ipsum id adipisicing enim velit labore. Nulla exercitation laborum laboris
      Lorem irure sit esse nulla mollit aliquip consectetur velit
    </Panel>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('render panel with only a heading and no content', () => {
  const { container } = render(<Panel header="Test Header" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('does not forward styles', () => {
  const { container } = render(
    <Panel className="test" style={{ background: 'red' }}>
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur
      officia ex. Ipsum eiusmod fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse
      deserunt nostrud ipsum id adipisicing enim velit labore. Nulla exercitation laborum laboris
      Lorem irure sit esse nulla mollit aliquip consectetur velit
    </Panel>,
  );

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('renders a header and a button action', () => {
  const { getByRole } = render(
    <Panel action={{ text: 'Test Action' }} header="Test Header">
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur
      officia ex. Ipsum eiusmod fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse
      deserunt nostrud ipsum id adipisicing enim velit labore. Nulla exercitation laborum laboris
      Lorem irure sit esse nulla mollit aliquip consectetur velit
    </Panel>,
  );

  const header = getByRole('heading');

  expect(header).toBeInTheDocument();
  expect(header).toHaveTextContent('Test Header');

  const actionButton = getByRole('button');

  expect(actionButton).toBeInTheDocument();
  expect(actionButton).toHaveTextContent('Test Action');
});

test('renders a header and a dropdown action', async () => {
  const dropdownItemCallback = jest.fn();
  const { getByRole } = render(
    <Panel
      action={{
        items: [{ content: 'Action 1', onItemClick: dropdownItemCallback }],
        toggle: {
          text: 'Toggle Dropdown',
        },
      }}
      header="Test Header"
    >
      Lorem Ipsum
    </Panel>,
  );

  const dropdownToggle = getByRole('button');

  expect(dropdownToggle).toBeInTheDocument();
  expect(dropdownToggle.textContent).toBe('Toggle Dropdown');

  await userEvent.click(dropdownToggle);
  await userEvent.click(screen.getByRole('option', { name: 'Action 1' }));

  expect(dropdownItemCallback).toHaveBeenCalled();
});

test('renders a badge and header', () => {
  const { getByRole, getByText } = render(
    <Panel badge={{ label: 'danger', variant: 'danger' }} header="Test Header">
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur
      officia ex. Ipsum eiusmod fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse
      deserunt nostrud ipsum id adipisicing enim velit labore. Nulla exercitation laborum laboris
      Lorem irure sit esse nulla mollit aliquip consectetur velit
    </Panel>,
  );

  const header = getByRole('heading');

  expect(header).toBeInTheDocument();

  const badge = getByText('danger');

  expect(badge).toBeInTheDocument();
});

test('renders a lozenge and header', () => {
  const { getByRole, getByText } = render(
    <Panel header="Test Header" lozenge={{ label: 'Beta', variant: 'beta' }}>
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur
      officia ex. Ipsum eiusmod fugiat amet pariatur culpa tempor aliquip tempor nisi. Irure esse
      deserunt nostrud ipsum id adipisicing enim velit labore. Nulla exercitation laborum laboris
      Lorem irure sit esse nulla mollit aliquip consectetur velit
    </Panel>,
  );

  const header = getByRole('heading');

  expect(header).toBeInTheDocument();

  const lozenge = getByText('Beta');

  expect(lozenge).toBeInTheDocument();
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

  const { getByRole } = render(
    <Panel action={{ text: 'Test Action', onClick }} header="Test Header">
      Dolore proident eiusmod sint est enim laboris anim minim quis ut adipisicing consectetur
      officia ex. Ipsum eiusmod
    </Panel>,
  );

  fireEvent.click(getByRole('button'));

  expect(onClick).toHaveBeenCalled();
});

test('forwards data attributes', () => {
  const { getByTestId } = render(
    <Panel data-testid="panel" header="Test Header">
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
    // @ts-expect-error - ignoring since paddingRight is not a valid prop
    <Panel data-testid="panel" header="Test Header" paddingRight="xxxLarge">
      Dolore proident eiusmod sint est enim laboris
    </Panel>,
  );

  const panel = getByTestId('panel');

  expect(panel).not.toHaveStyle(`padding-right: ${theme.spacing.xxxLarge}`);
});

test("panel action doesn't go to full width", () => {
  const { getByRole } = render(
    <Panel action={{ text: 'Test Action' }} header="Test Header">
      Test
    </Panel>,
  );

  const button = getByRole('button');

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
