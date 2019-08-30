import { Button, Dropdown, Flex, Text } from '@bigcommerce/big-design';
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

  return (
    <Flex flexDirection="row" justifyContent="space-between">
      {itemRange[0] !== itemRange[1] ? (
        <Text marginRight="xxSmall">
          {itemRange[0]} - {itemRange[1]} of {numOfItems}
        </Text>
      ) : (
        <Text marginRight="xxSmall">
          {itemRange[0]} of {numOfItems}
        </Text>
      )}
      <Dropdown
        onItemClick={handleRangeChange}
        trigger={<Button variant="subtle" iconOnly={<ArrowDropDownIcon color="secondary70" />} />}
      >
        {perPageRanges.map(range => {
          return <Dropdown.Item value={range}>{range} per page</Dropdown.Item>;
        })}
      </Dropdown>
      <ChevronLeftIcon onClick={handlePageDecrease} />
      <ChevronRightIcon onClick={handlePageIncrease} />
    </Flex>
  );
};
