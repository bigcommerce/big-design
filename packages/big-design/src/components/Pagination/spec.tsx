import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import 'jest-styled-components';

import { Pagination } from './index';

test('render pagination component', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();
  const { findByRole } = render(
    <Pagination
      currentPage={1}
      itemsPerPage={3}
      itemsPerPageOptions={[2, 3, 5]}
      onItemsPerPageChange={changeRange}
      onPageChange={changePage}
      totalItems={10}
    />,
  );

  const pagination = await findByRole('navigation');

  expect(pagination).toMatchSnapshot();
});

test('render pagination component with invalid page info', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();
  const { findByRole } = render(
    <Pagination
      currentPage={-2}
      itemsPerPage={3}
      itemsPerPageOptions={[2, 3, 5]}
      onItemsPerPageChange={changeRange}
      onPageChange={changePage}
      totalItems={10}
    />,
  );

  const pagination = await findByRole('navigation');

  expect(changePage).toHaveBeenCalled();
  expect(pagination).toMatchSnapshot();
});

test('render pagination component with invalid range info', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();
  const { findByRole } = render(
    <Pagination
      currentPage={1}
      itemsPerPage={-5}
      itemsPerPageOptions={[2, 3, 5]}
      onItemsPerPageChange={changeRange}
      onPageChange={changePage}
      totalItems={10}
    />,
  );
  const pagination = await findByRole('navigation');

  expect(changeRange).toHaveBeenCalled();
  expect(pagination).toMatchSnapshot();
});

test('render pagination component with no items', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();
  const { findByRole } = render(
    <Pagination
      currentPage={1}
      itemsPerPage={3}
      itemsPerPageOptions={[2, 3, 5]}
      onItemsPerPageChange={changeRange}
      onPageChange={changePage}
      totalItems={0}
    />,
  );
  const pagination = await findByRole('navigation');

  expect(pagination).toMatchSnapshot();
});

test('render pagination component while overriding button labels', async () => {
  const getRangeLabel = (first: number, last: number, totalItems: number) => {
    return `[Custom label] ${first}-${last} of ${totalItems}`;
  };
  const changePage = jest.fn();
  const changeRange = jest.fn();

  render(
    <Pagination
      currentPage={1}
      getRangeLabel={getRangeLabel}
      itemsPerPage={3}
      itemsPerPageOptions={[2, 3, 5]}
      label="[Custom] Pagination"
      localization={{ previousPage: 'Pagina previa', nextPage: 'Pagina siguiente' }}
      onItemsPerPageChange={changeRange}
      onPageChange={changePage}
      totalItems={10}
    />,
  );

  const pagination = await screen.findByRole('navigation', { name: '[Custom] Pagination' });
  const dropdown = await screen.findByRole('button', { name: '[Custom label] 1-3 of 10' });
  const prevPage = await screen.findByRole('button', { name: 'Pagina previa' });
  const nextPage = await screen.findByRole('button', { name: 'Pagina siguiente' });

  expect(pagination).toBeInTheDocument();
  expect(dropdown).toBeInTheDocument();
  expect(prevPage).toBeInTheDocument();
  expect(nextPage).toBeInTheDocument();
});

test('trigger range change', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();
  const { findByText } = render(
    <Pagination
      currentPage={1}
      itemsPerPage={2}
      itemsPerPageOptions={[2, 3, 5]}
      onItemsPerPageChange={changeRange}
      onPageChange={changePage}
      totalItems={10}
    />,
  );

  const option = await findByText('1 - 2 of 10');

  await userEvent.click(option);
  await userEvent.keyboard('{ArrowDown}{Enter}');

  expect(changeRange).toHaveBeenCalled();
  expect(option).toBeInTheDocument();
});

test('trigger page decrease', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();

  render(
    <Pagination
      currentPage={2}
      itemsPerPage={3}
      itemsPerPageOptions={[2, 3, 5]}
      onItemsPerPageChange={changeRange}
      onPageChange={changePage}
      totalItems={10}
    />,
  );

  let title = await screen.findByTitle('Previous page');

  const svg = title.parentNode;
  const span = svg?.parentNode ?? null;
  const button = span?.parentNode ?? null;

  if (button) {
    await waitFor(() => fireEvent.click(button));
  }

  title = await screen.findByTitle('Previous page');

  expect(changePage).toHaveBeenCalled();
  expect(title).toBeInTheDocument();
});

test('trigger page increase', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();

  render(
    <Pagination
      currentPage={1}
      itemsPerPage={3}
      itemsPerPageOptions={[2, 3, 5]}
      onItemsPerPageChange={changeRange}
      onPageChange={changePage}
      totalItems={10}
    />,
  );

  let title = await screen.findByTitle('Next page');

  const svg = title.parentNode;
  const span = svg?.parentNode ?? null;
  const button = span?.parentNode ?? null;

  if (button) {
    await waitFor(() => fireEvent.click(button));
  }

  title = await screen.findByTitle('Next page');

  expect(changePage).toHaveBeenCalled();
  expect(title).toBeInTheDocument();
});

test('current itemsPerPage highlighted', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();

  render(
    <Pagination
      currentPage={2}
      itemsPerPage={3}
      itemsPerPageOptions={[2, 3, 5]}
      onItemsPerPageChange={changeRange}
      onPageChange={changePage}
      totalItems={10}
    />,
  );

  const button = await screen.findByRole('button', { name: '4 - 6 of 10' });

  await userEvent.click(button);

  const options = screen.getAllByRole('option');

  expect(button).toHaveAttribute('aria-activedescendant', options[1].id);
});

test('renders localized labels', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();

  render(
    <Pagination
      currentPage={1}
      getRangeLabel={(start: number, end: number, totalItems: number): string => {
        return `${start} - ${end} de ${totalItems}`;
      }}
      itemsPerPage={3}
      itemsPerPageOptions={[2, 3, 5]}
      label="Paginacion"
      localization={{ previousPage: 'Pagina previa', nextPage: 'Pagina siguiente' }}
      onItemsPerPageChange={changeRange}
      onPageChange={changePage}
      totalItems={10}
    />,
  );

  const pagination = await screen.findByRole('navigation', { name: 'Paginacion' });
  const dropdown = await screen.findByRole('button', { name: '1 - 3 de 10' });
  const prevPage = await screen.findByRole('button', { name: 'Pagina previa' });
  const nextPage = await screen.findByRole('button', { name: 'Pagina siguiente' });

  expect(pagination).toBeInTheDocument();
  expect(dropdown).toBeInTheDocument();
  expect(prevPage).toBeInTheDocument();
  expect(nextPage).toBeInTheDocument();
});
