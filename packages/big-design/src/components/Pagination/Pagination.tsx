import { ArrowDropDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@bigcommerce/big-design-icons';
import React, { useEffect, useState } from 'react';

import { MarginProps } from '../../mixins';
import { Dropdown } from '../Dropdown';
import { Flex } from '../Flex';

import { StyledButton } from './styled';

export interface PaginationProps extends MarginProps {
  currentRange: number;
  currentPage: number;
  totalItems: number;
  rangeOptions: number[];
  onPageChange(page: number): void;
  onRangeChange(range: number): void;
}

export const Pagination: React.FC<PaginationProps> = props => {
  const { currentRange, currentPage, totalItems, rangeOptions, onPageChange, onRangeChange } = props;

  const [maxPages, setMaxPages] = useState(Math.ceil(totalItems / currentRange));
  const [itemRange, setItemRange] = useState([0, 0]);

  useEffect(() => {
    if (currentPage > maxPages) {
      onPageChange(maxPages);
    }
    let firstItemInRange = currentRange * (currentPage - 1) + 1;
    let lastItemInRange = currentRange * currentPage;
    if (lastItemInRange > totalItems) {
      lastItemInRange = totalItems;
    }
    if (firstItemInRange > totalItems) {
      firstItemInRange = totalItems;
    }
    if (lastItemInRange === 0 || isNaN(lastItemInRange) || isNaN(firstItemInRange)) {
      firstItemInRange = 0;
      lastItemInRange = 0;
    }

    setItemRange([firstItemInRange, lastItemInRange]);
  }, [currentPage, currentRange, totalItems]);

  const handlePageIncrease = () => {
    let nextPage = currentPage + 1;
    if (nextPage > maxPages) {
      nextPage = maxPages;
    }
    onPageChange(nextPage);
  };

  const handlePageDecrease = () => {
    let nextPage = currentPage - 1;
    if (nextPage < 1) {
      nextPage = 1;
    }
    onPageChange(nextPage);
  };

  const handleRangeChange = (range: number) => {
    setMaxPages(Math.ceil(totalItems / range));
    onRangeChange(range);
  };

  const showRanges = () => {
    if (itemRange[0] !== itemRange[1]) {
      return `${itemRange[0]} - ${itemRange[1]} of ${totalItems}`;
    } else {
      return `${itemRange[0]} of ${totalItems}`;
    }
  };

  return (
    <Flex flexDirection="row" justifyContent="center" role="navigation" aria-label="pagination">
      <Dropdown
        onItemClick={handleRangeChange}
        trigger={
          <StyledButton variant="subtle" iconRight={<ArrowDropDownIcon size="xxLarge" color="secondary70" />}>
            {showRanges()}
          </StyledButton>
        }
      >
        {rangeOptions.map(range => {
          return <Dropdown.Item value={range}>{range} per page</Dropdown.Item>;
        })}
      </Dropdown>
      <Flex.Item>
        <StyledButton
          variant="subtle"
          disabled={currentPage <= 1}
          aria-label="previous page"
          onClick={handlePageDecrease}
        >
          <ChevronLeftIcon />
        </StyledButton>

        <StyledButton
          variant="subtle"
          disabled={currentPage >= maxPages}
          aria-label="next page"
          onClick={handlePageIncrease}
        >
          <ChevronRightIcon />
        </StyledButton>
      </Flex.Item>
    </Flex>
  );
};
