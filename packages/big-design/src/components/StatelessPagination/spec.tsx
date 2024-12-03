import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import 'jest-styled-components';

import { StatelessPagination } from './index';

test('render Stateless pagination component', async () => {
  render(
    <StatelessPagination
      itemsPerPage={3}
      itemsPerPageOptions={[2, 3, 5]}
      onItemsPerPageChange={jest.fn()}
      onNext={jest.fn()}
      onPrevious={jest.fn()}
    />,
  );

  const pagination = await screen.findByRole('navigation');

  expect(pagination).toMatchSnapshot();
});

test('trigger range change', async () => {
  const changeRange = jest.fn();

  render(
    <StatelessPagination
      itemsPerPage={2}
      itemsPerPageOptions={[2, 3, 5]}
      onItemsPerPageChange={changeRange}
      onNext={jest.fn()}
      onPrevious={jest.fn()}
    />,
  );

  await userEvent.click(await screen.findByRole('button', { name: 'Show 2 items' }));
  await userEvent.click(await screen.findByRole('option', { name: '3' }));

  expect(changeRange).toHaveBeenCalledWith(3);
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

describe('when "onNext" is not provided', () => {
  test('render Stateless pagination component with next disabled', async () => {
    const onNext = undefined;

    render(
      <StatelessPagination
        itemsPerPage={-5}
        itemsPerPageOptions={[2, 3, 5]}
        onItemsPerPageChange={jest.fn()}
        onNext={onNext}
        onPrevious={jest.fn()}
      />,
    );

    expect(await screen.findByRole('button', { name: 'Next page' })).toBeDisabled();
  });
});

describe('when "onPrevious" is not provided', () => {
  test('render Stateless pagination component with previous disabled', async () => {
    const onPrevious = undefined;

    render(
      <StatelessPagination
        itemsPerPage={-5}
        itemsPerPageOptions={[2, 3, 5]}
        onItemsPerPageChange={jest.fn()}
        onNext={jest.fn()}
        onPrevious={onPrevious}
      />,
    );

    expect(await screen.findByRole('button', { name: 'Previous page' })).toBeDisabled();
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
  const customLocalization = {
    previousPage: 'Pagina previa',
    nextPage: 'Pagina siguiente',
    label: 'Paginacion',
    rangeLabel: 'Mostrar 3 artículos',
  };

  render(
    <StatelessPagination
      itemsPerPage={3}
      itemsPerPageOptions={[2, 3, 5]}
      localization={customLocalization}
      onItemsPerPageChange={jest.fn()}
      onNext={jest.fn()}
      onPrevious={jest.fn()}
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
