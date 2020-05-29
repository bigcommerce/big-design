import { ChevronLeftIcon, ChevronRightIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Button } from '../Button';

import { StyledHeader } from './styled';

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
  <StyledHeader date={date}>
    <Button
      type="button"
      iconOnly={<ChevronLeftIcon />}
      onClick={decreaseMonth}
      disabled={prevMonthButtonDisabled}
      variant="subtle"
    />

    <span>{`${months[date.getMonth()]} ${date.getFullYear()}`}</span>

    <Button
      type="button"
      iconOnly={<ChevronRightIcon title="add" />}
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
      variant="subtle"
    />
  </StyledHeader>
);

export default Header;
