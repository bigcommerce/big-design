import React from 'react';

import 'jest-styled-components';
import { fireEvent, render } from '@test/utils';

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

test('trigger range change', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();
  const { getByText, findByText } = render(
    <Pagination
      currentPage={1}
      itemsPerPage={2}
      itemsPerPageOptions={[2, 3, 5]}
      onItemsPerPageChange={changeRange}
      onPageChange={changePage}
      totalItems={10}
    />,
  );

  fireEvent.click(getByText('1 - 2 of 10'));
  fireEvent.keyDown(getByText('2'), { key: 'ArrowDown', code: 40 });
  fireEvent.keyDown(getByText('3'), { key: 'Enter', code: 13 });

  const option = await findByText('1 - 2 of 10');

  expect(changeRange).toHaveBeenCalled();
  expect(option).toBeInTheDocument();
});

test('trigger page decrease', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();
  const { findByTitle } = render(
    <Pagination
      currentPage={2}
      itemsPerPage={3}
      itemsPerPageOptions={[2, 3, 5]}
      onItemsPerPageChange={changeRange}
      onPageChange={changePage}
      totalItems={10}
    />,
  );

  let title = await findByTitle('Previous page');

  const svg = title.parentNode as HTMLElement;
  const span = svg.parentNode as HTMLElement;
  const button = span.parentNode as HTMLButtonElement;

  fireEvent.click(button);

  title = await findByTitle('Previous page');

  expect(changePage).toHaveBeenCalled();
  expect(title).toBeInTheDocument();
});

test('trigger page increase', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();
  const { findByTitle } = render(
    <Pagination
      currentPage={1}
      itemsPerPage={3}
      itemsPerPageOptions={[2, 3, 5]}
      onItemsPerPageChange={changeRange}
      onPageChange={changePage}
      totalItems={10}
    />,
  );

  let title = await findByTitle('Next page');

  const svg = title.parentNode as HTMLElement;
  const span = svg.parentNode as HTMLElement;
  const button = span.parentNode as HTMLButtonElement;

  fireEvent.click(button);

  title = await findByTitle('Next page');

  expect(changePage).toHaveBeenCalled();
  expect(title).toBeInTheDocument();
});
