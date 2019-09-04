import { Dropdown, Flex } from '@bigcommerce/big-design';
import { ArrowDropDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@bigcommerce/big-design-icons';
import React, { useEffect, useState } from 'react';

import { MarginProps } from '../../mixins';

import { StyledButton } from './styled';

export interface PaginationProps extends MarginProps {
  currentPerPage: number;
  currentPage: number;
  numOfItems: number;
  perPageOptions: number[];
  onPageUpdate(page: number): void;
  onRangeUpdate(range: number): void;
}

export const Pagination: React.FunctionComponent<PaginationProps> = props => {
  const { currentPerPage, currentPage, numOfItems, perPageOptions, onPageUpdate, onRangeUpdate } = props;

  const [maxPages, setMaxPages] = useState(Math.ceil(numOfItems / currentPerPage));
  const [itemRange, setItemRange] = useState([0, 0]);

  useEffect(() => {
    const first = currentPerPage * (currentPage - 1) + 1;
    let second = currentPerPage * currentPage;
    if (second > numOfItems) {
      second = numOfItems;
    }
    const range = [first, second];
    setItemRange(range);
  }, [currentPage, currentPerPage, numOfItems]);

  const handlePageIncrease = () => {
    let nextPage = currentPage + 1;
    if (nextPage > maxPages) {
      nextPage = 1;
    }
    onPageUpdate(nextPage);
  };

  const handlePageDecrease = () => {
    let nextPage = currentPage - 1;
    if (nextPage < 1) {
      nextPage = maxPages;
    }
    onPageUpdate(nextPage);
  };

  const handleRangeChange = (range: number) => {
    setMaxPages(Math.ceil(numOfItems / range));
    onRangeUpdate(range);
  };

  const showRanges = () => {
    if (itemRange[0] !== itemRange[1]) {
      return itemRange[0] + ' - ' + itemRange[1] + ' of ' + numOfItems;
    } else {
      return itemRange[0] + ' of ' + numOfItems;
    }
  };

  return (
    <Flex flexDirection="row" justifyContent="space-between" role="navigation" aria-label="pagination">
      <Dropdown
        onItemClick={handleRangeChange}
        trigger={
          <StyledButton>
            {showRanges()}
            <ArrowDropDownIcon color="secondary70" size="xxLarge" />
          </StyledButton>
        }
      >
        {perPageOptions.map(range => {
          return <Dropdown.Item value={range}>{range} per page</Dropdown.Item>;
        })}
      </Dropdown>
      {currentPage > 1 ? (
        <ChevronLeftIcon
          aria-label="previous page"
          onClick={handlePageDecrease}
          onKeyDown={handlePageDecrease}
          role="button"
          tabIndex={0}
        />
      ) : (
        <ChevronLeftIcon aria-disabled={true} aria-label="previous page" color="secondary" />
      )}
      {currentPage < maxPages ? (
        <ChevronRightIcon
          aria-label="next page"
          onClick={handlePageIncrease}
          onKeyDown={handlePageIncrease}
          role="button"
          tabIndex={0}
        />
      ) : (
        <ChevronRightIcon aria-disabled={true} aria-label="next page" color="secondary" />
      )}
    </Flex>
  );
};
