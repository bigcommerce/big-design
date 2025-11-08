import { render, screen, within } from '@testing-library/react';
import React from 'react';

import { warning } from '../../utils';
import { ActionBar } from '../ActionBar';
import { Header } from '../Header';

import { Page } from './Page';

test('renders children', () => {
  render(<Page>Page content</Page>);

  expect(screen.getByText('Page content')).toBeInTheDocument();
});

test('renders with header', () => {
  render(<Page header={<Header title="Page Title" />}>Page content</Page>);

  expect(screen.getByRole('heading', { name: 'Page Title' })).toBeInTheDocument();
});

test('warns when header is not a Header component', () => {
  render(<Page header={<div>Not a Header</div>}>Page content</Page>);

  expect(warning).toHaveBeenCalledWith('A `Header` component is required for the `header` prop.');
});

test('renders with message', () => {
  render(<Page message={{ messages: [{ text: 'Test message' }] }}>Page content</Page>);

  const message = screen.getByRole('alert');

  expect(within(message).getByText('Test message')).toBeInTheDocument();
});

test('does not render message when messages array is empty', () => {
  render(<Page message={{ messages: [] }}>Page content</Page>);

  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('renders with background', () => {
  const backgroundProps = {
    src: 'test-image.jpg',
    backgroundSize: 'cover',
    backgroundPosition: 'left',
    backgroundRepeat: 'no-repeat',
  };

  const { container } = render(<Page background={backgroundProps}>Page content</Page>);
  // eslint-disable-next-line testing-library/no-node-access
  const firstChild = container.firstElementChild;

  if (!firstChild) {
    throw new Error();
  }

  expect(firstChild).toHaveStyle(`
      background-image: url(test-image.jpg);
      background-size: cover;
      background-position: left;
      background-repeat: no-repeat;
    `);
});

test('renders with default background styles', () => {
  const backgroundProps = {
    src: 'test-image.jpg',
  };

  const { container } = render(<Page background={backgroundProps}>Page content</Page>);
  // eslint-disable-next-line testing-library/no-node-access
  const firstChild = container.firstElementChild;

  if (!firstChild) {
    throw new Error();
  }

  expect(firstChild).toHaveStyle(`
      background-image: url(test-image.jpg);
      background-size: contain;
      background-position: top right;
      background-repeat: no-repeat;
    `);
});

test('renders without background by default', () => {
  render(<Page>Page content</Page>);

  const { container } = render(<Page>Page content</Page>);
  // eslint-disable-next-line testing-library/no-node-access
  const firstChild = container.firstElementChild;

  if (!firstChild) {
    throw new Error();
  }

  expect(firstChild).not.toHaveStyle('background-size: contain');
  expect(firstChild).toHaveStyle(`
    background-color: #F6F7FC;
    min-height: 100dvh;
  `);
});

test('renders with action bar', () => {
  render(
    <Page
      actionBar={
        <ActionBar
          actions={[
            {
              text: 'Main action',
              variant: 'primary',
            },
          ]}
        />
      }
      header={<Header title="Page Title" />}
    >
      Page content
    </Page>,
  );

  expect(screen.getByRole('heading', { name: 'Page Title' })).toBeInTheDocument();
});

test('warns when action bar is not an ActionBar component', () => {
  render(<Page actionBar={<div>Not a Header</div>}>Page content</Page>);

  expect(warning).toHaveBeenCalledWith(
    'An `ActionBar` component is required for the `actionBar` prop.',
  );
});
