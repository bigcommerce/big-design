import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import 'jest-styled-components';

import { StatelessPagination } from './index';

test('render Stateless pagination component', async () => {
  const { findByRole } = render(
    <StatelessPagination
      itemsPerPage={3}
      itemsPerPageOptions={[2, 3, 5]}
      onItemsPerPageChange={jest.fn()}
      onNext={jest.fn()}
      onPrevious={jest.fn()}
    />,
  );

  const pagination = await findByRole('navigation');

  expect(pagination).toMatchSnapshot();
});

test('render Stateless pagination component while overriding button labels', async () => {
  render(
    <StatelessPagination
      itemsPerPage={3}
      itemsPerPageOptions={[2, 3, 5]}
      label="[Custom] Pagination"
      localization={{ previousPage: 'Pagina previa', nextPage: 'Pagina siguiente' }}
      onItemsPerPageChange={jest.fn()}
      onNext={jest.fn()}
      onPrevious={jest.fn()}
      rangeLabel="[Custom range label]"
    />,
  );

  const pagination = await screen.findByRole('navigation', { name: '[Custom] Pagination' });
  const dropdown = await screen.findByRole('button', { name: '[Custom range label]' });
  const prevPage = await screen.findByRole('button', { name: 'Pagina previa' });
  const nextPage = await screen.findByRole('button', { name: 'Pagina siguiente' });

  expect(pagination).toBeInTheDocument();
  expect(dropdown).toBeInTheDocument();
  expect(prevPage).toBeInTheDocument();
  expect(nextPage).toBeInTheDocument();
});

test('trigger range change', async () => {
  const changeRange = jest.fn();
  const { findByText } = render(
    <StatelessPagination
      itemsPerPage={2}
      itemsPerPageOptions={[2, 3, 5]}
      onItemsPerPageChange={changeRange}
      onNext={jest.fn()}
      onPrevious={jest.fn()}
    />,
  );

  const option = await findByText('Show 2 items');

  await userEvent.click(option);
  await userEvent.keyboard('{ArrowDown}{Enter}');

  expect(changeRange).toHaveBeenCalled();
  expect(option).toBeInTheDocument();
});

test('triggers onPrevious callback', async () => {
  const onPrevious = jest.fn();

  render(
    <StatelessPagination
      itemsPerPage={3}
      itemsPerPageOptions={[2, 3, 5]}
      onItemsPerPageChange={jest.fn()}
      onNext={jest.fn()}
      onPrevious={onPrevious}
    />,
  );

  await userEvent.click(screen.getByRole('button', { name: 'Previous page' }));

  expect(onPrevious).toHaveBeenCalled();
});

test('trigger onNext callback', async () => {
  const onNext = jest.fn();

  render(
    <StatelessPagination
      itemsPerPage={3}
      itemsPerPageOptions={[2, 3, 5]}
      onItemsPerPageChange={jest.fn()}
      onNext={onNext}
      onPrevious={jest.fn()}
    />,
  );

  await userEvent.click(screen.getByRole('button', { name: 'Next page' }));

  expect(onNext).toHaveBeenCalled();
});

describe('when "disableNext" is set to "true"', () => {
  test('render Stateless pagination component with next disabled', async () => {
    const { findByRole } = render(
      <StatelessPagination
        disableNext={true}
        itemsPerPage={-5}
        itemsPerPageOptions={[2, 3, 5]}
        onItemsPerPageChange={jest.fn()}
        onNext={jest.fn()}
        onPrevious={jest.fn()}
      />,
    );

    expect(await findByRole('button', { name: 'Next page' })).toBeDisabled();
  });
});

describe('when "disablePrevious" is set to "true"', () => {
  test('render Stateless pagination component with previous disabled', async () => {
    const { findByRole } = render(
      <StatelessPagination
        disablePrevious={true}
        itemsPerPage={-5}
        itemsPerPageOptions={[2, 3, 5]}
        onItemsPerPageChange={jest.fn()}
        onNext={jest.fn()}
        onPrevious={jest.fn()}
      />,
    );

    expect(await findByRole('button', { name: 'Previous page' })).toBeDisabled();
  });
});

test('current itemsPerPage highlighted', async () => {
  render(
    <StatelessPagination
      itemsPerPage={3}
      itemsPerPageOptions={[2, 3, 5]}
      onItemsPerPageChange={jest.fn()}
      onNext={jest.fn()}
      onPrevious={jest.fn()}
    />,
  );

  const button = await screen.findByRole('button', { name: 'Show 3 items' });

  await userEvent.click(button);

  const options = screen.getAllByRole('option');

  expect(button).toHaveAttribute('aria-activedescendant', options[1].id);
});

test('renders localized labels', async () => {
  render(
    <StatelessPagination
      itemsPerPage={3}
      itemsPerPageOptions={[2, 3, 5]}
      label="Paginacion"
      localization={{ previousPage: 'Pagina previa', nextPage: 'Pagina siguiente' }}
      onItemsPerPageChange={jest.fn()}
      onNext={jest.fn()}
      onPrevious={jest.fn()}
      rangeLabel="Mostrar 3 artículos"
    />,
  );

  const pagination = await screen.findByRole('navigation', { name: 'Paginacion' });
  const dropdown = await screen.findByRole('button', { name: 'Mostrar 3 artículos' });
  const prevPage = await screen.findByRole('button', { name: 'Pagina previa' });
  const nextPage = await screen.findByRole('button', { name: 'Pagina siguiente' });

  expect(pagination).toBeInTheDocument();
  expect(dropdown).toBeInTheDocument();
  expect(prevPage).toBeInTheDocument();
  expect(nextPage).toBeInTheDocument();
});
