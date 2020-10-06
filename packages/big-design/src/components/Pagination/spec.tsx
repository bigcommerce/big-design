import React from 'react';

import 'jest-styled-components';
import { fireEvent, render, waitForElement } from '@test/utils';

import { Pagination } from './index';

test('render pagination component', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();
  const { container } = render(
    <Pagination
      itemsPerPage={3}
      currentPage={1}
      totalItems={10}
      itemsPerPageOptions={[2, 3, 5]}
      onPageChange={changePage}
      onItemsPerPageChange={changeRange}
    />,
  );

  expect(container.firstChild).toMatchSnapshot();
  await waitForElement(() => container.firstChild);
});

test('render pagination component with invalid page info', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();
  const { container } = render(
    <Pagination
      itemsPerPage={3}
      currentPage={-2}
      totalItems={10}
      itemsPerPageOptions={[2, 3, 5]}
      onPageChange={changePage}
      onItemsPerPageChange={changeRange}
    />,
  );
  expect(changePage).toHaveBeenCalled();
  expect(container.firstChild).toMatchSnapshot();
  await waitForElement(() => container.firstChild);
});

test('render pagination component with invalid range info', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();
  const { container } = render(
    <Pagination
      itemsPerPage={-5}
      currentPage={1}
      totalItems={10}
      itemsPerPageOptions={[2, 3, 5]}
      onPageChange={changePage}
      onItemsPerPageChange={changeRange}
    />,
  );
  expect(changeRange).toHaveBeenCalled();
  expect(container.firstChild).toMatchSnapshot();
  await waitForElement(() => container.firstChild);
});

test('render pagination component with no items', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();
  const { container } = render(
    <Pagination
      itemsPerPage={3}
      currentPage={1}
      totalItems={0}
      itemsPerPageOptions={[2, 3, 5]}
      onPageChange={changePage}
      onItemsPerPageChange={changeRange}
    />,
  );
  expect(container.firstChild).toMatchSnapshot();
  await waitForElement(() => container.firstChild);
});

test('trigger range change', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();
  const { getByText } = render(
    <Pagination
      itemsPerPage={2}
      currentPage={1}
      totalItems={10}
      itemsPerPageOptions={[2, 3, 5]}
      onPageChange={changePage}
      onItemsPerPageChange={changeRange}
    />,
  );
  fireEvent.click(getByText('1 - 2 of 10'));
  fireEvent.keyDown(getByText('2'), { key: 'ArrowDown', code: 40 });
  fireEvent.keyDown(getByText('3'), { key: 'Enter', code: 13 });

  expect(changeRange).toHaveBeenCalled();
  await waitForElement(() => getByText('1 - 2 of 10'));
});

test('trigger page decrease', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();
  const { getByTitle } = render(
    <Pagination
      itemsPerPage={3}
      currentPage={2}
      totalItems={10}
      itemsPerPageOptions={[2, 3, 5]}
      onPageChange={changePage}
      onItemsPerPageChange={changeRange}
    />,
  );

  const title = getByTitle('Previous page');
  const svg = title.parentNode as HTMLElement;
  const span = svg.parentNode as HTMLElement;
  const button = span.parentNode as HTMLButtonElement;

  fireEvent.click(button);

  expect(changePage).toHaveBeenCalled();
  await waitForElement(() => getByTitle('Previous page'));
});

test('trigger page increase', async () => {
  const changePage = jest.fn();
  const changeRange = jest.fn();
  const { getByTitle } = render(
    <Pagination
      itemsPerPage={3}
      currentPage={1}
      totalItems={10}
      itemsPerPageOptions={[2, 3, 5]}
      onPageChange={changePage}
      onItemsPerPageChange={changeRange}
    />,
  );

  const title = getByTitle('Next page');
  const svg = title.parentNode as HTMLElement;
  const span = svg.parentNode as HTMLElement;
  const button = span.parentNode as HTMLButtonElement;

  fireEvent.click(button);

  expect(changePage).toHaveBeenCalled();
  await waitForElement(() => getByTitle('Next page'));
});
