import { ChevronLeftIcon, ChevronRightIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Flex } from '..';
import { Button } from '../Button';
import { Text } from '../Typography';

export interface HeaderProps {
  date?: Date;
  nextMonthButtonDisabled?: boolean;
  prevMonthButtonDisabled?: boolean;
  decreaseMonth?(): void;
  increaseMonth?(): void;
}

const months: string[] = Array(12)
  .fill('')
  .map((_, i) => new Date(0, i).toLocaleString('en', { month: 'long' }));

const Header: React.FC<HeaderProps> = ({
  date = new Date(),
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => (
  <Flex alignItems="center" justifyContent="space-between">
    <Button
      title="View previous month."
      type="button"
      iconOnly={<ChevronLeftIcon />}
      onClick={decreaseMonth}
      disabled={prevMonthButtonDisabled}
      variant="subtle"
    />

    <Text as="span" marginBottom="none" bold>{`${months[date.getMonth()]} ${date.getFullYear()}`}</Text>

    <Button
      title="View next month."
      type="button"
      iconOnly={<ChevronRightIcon title="add" />}
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
      variant="subtle"
    />
  </Flex>
);

export default Header;
