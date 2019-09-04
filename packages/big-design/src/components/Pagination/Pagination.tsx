import { Button, Dropdown, Flex } from '@bigcommerce/big-design';
import { ArrowDropDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@bigcommerce/big-design-icons';
import React, { useEffect, useState } from 'react';

import { MarginProps } from '../../mixins';

export interface PaginationProps extends MarginProps {
  currentRange: number;
  currentPage: number;
  numOfItems: number;
  perPageRanges: number[];
  onPageUpdate(page: number): void;
  onRangeUpdate(range: number): void;
}

export const Pagination: React.FunctionComponent<PaginationProps> = props => {
  const { currentRange, currentPage, numOfItems, perPageRanges, onPageUpdate, onRangeUpdate } = props;

  const [maxPages, setMaxPages] = useState(Math.ceil(numOfItems / currentRange));
  const [itemRange, setItemRange] = useState([0, 0]);

  useEffect(() => {
    const first = currentRange * (currentPage - 1) + 1;
    let second = currentRange * currentPage;
    if (second > numOfItems) {
      second = numOfItems;
    }
    const range = [first, second];
    setItemRange(range);
  }, [currentPage, currentRange, numOfItems]);

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
    <Flex flexDirection="row" justifyContent="space-between">
      <Dropdown
        onItemClick={handleRangeChange}
        trigger={
          <Button variant="subtle" iconRight={<ArrowDropDownIcon color="secondary70" />}>
            {showRanges()}
          </Button>
        }
      >
        {perPageRanges.map(range => {
          return <Dropdown.Item value={range}>{range} per page</Dropdown.Item>;
        })}
      </Dropdown>
      {currentPage > 1 ? <ChevronLeftIcon onClick={handlePageDecrease} /> : <ChevronLeftIcon color="secondary" />}
      {currentPage < maxPages ? (
        <ChevronRightIcon onClick={handlePageIncrease} />
      ) : (
        <ChevronRightIcon color="secondary" />
      )}
    </Flex>
  );
};
