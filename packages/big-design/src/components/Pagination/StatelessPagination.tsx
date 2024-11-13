import {
  ArrowDropDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@bigcommerce/big-design-icons';
import React, { memo } from 'react';

import { MarginProps } from '../../helpers';
import { Dropdown, DropdownItem } from '../Dropdown';
import { Flex, FlexItem } from '../Flex';

import { StyledButton } from './styled';

export interface PaginationLocalization {
  previousPage: string;
  nextPage: string;
}

const defaultLocalization: PaginationLocalization = {
  previousPage: 'Previous page',
  nextPage: 'Next page',
};

export interface StatelessPaginationProps extends MarginProps {
  currentPage?: number;
  itemsPerPage: number;
  itemsPerPageOptions: number[];
  onItemsPerPageChange(range: number): void;
  label?: string;
  localization?: PaginationLocalization;
  rangeLabel?: string;
  disableNext?: boolean;
  onNext(): void;
  disablePrevious?: boolean;
  onPrevious(): void;
}

export const StatelessPagination: React.FC<StatelessPaginationProps> = memo(
  ({
    itemsPerPage,
    itemsPerPageOptions = [],
    onItemsPerPageChange,
    label = 'pagination',
    localization = defaultLocalization,
    rangeLabel,
    disableNext = false,
    onNext,
    disablePrevious = false,
    onPrevious,
  }) => {
    const handleRangeChange = (item: DropdownItem) => {
      onItemsPerPageChange(Number(item.hash));
    };

    return (
      <Flex aria-label={label} flexDirection="row" role="navigation">
        <FlexItem>
          <Dropdown
            items={itemsPerPageOptions.map((range) => ({
              content: `${range}`,
              hash: `${range}`,
              onItemClick: handleRangeChange,
            }))}
            positionFixed={true}
            selectedItem={{
              content: `${itemsPerPage}`,
              hash: `${itemsPerPage}`,
              onItemClick: handleRangeChange,
            }}
            toggle={
              <StyledButton
                iconRight={<ArrowDropDownIcon size="xxLarge" />}
                type="button"
                variant="subtle"
              >
                {rangeLabel || `Show ${itemsPerPage} items`}
              </StyledButton>
            }
          />
        </FlexItem>
        <FlexItem>
          <StyledButton
            disabled={disablePrevious}
            iconOnly={<ChevronLeftIcon title={localization.previousPage} />}
            onClick={() => onPrevious()}
            type="button"
            variant="subtle"
          />

          <StyledButton
            disabled={disableNext}
            iconOnly={<ChevronRightIcon title={localization.nextPage} />}
            onClick={() => onNext()}
            type="button"
            variant="subtle"
          />
        </FlexItem>
      </Flex>
    );
  },
);

StatelessPagination.displayName = 'Pagination';
