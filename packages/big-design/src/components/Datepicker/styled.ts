import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { DatepickerProps } from './Datepicker';
import { HeaderProps } from './Header';

export const StyledHeader = styled.div<HeaderProps>`
  align-items: center;
  display: flex;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  justify-content: space-between;
  margin: ${({ theme }) => theme.spacing.small};
`;

export const StyledDatepicker = styled.div<DatepickerProps>`
  & .react-datepicker-wrapper {
    display: inline-block;
    width: 100%;
  }

  & .react-datepicker__input-container {
    display: inline-block;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    position: relative;
    width: 100%;
  }

  & .react-datepicker__month {
    margin: ${({ theme }) => theme.spacing.xSmall};
    text-align: center;
  }

  & .react-datepicker__header {
    border-top-left-radius: ${({ theme }) => theme.spacing.xxSmall};
    border-top-right-radius: ${({ theme }) => theme.spacing.xxSmall};
    position: relative;
    text-align: center;
  }

  & .react-datepicker__current-month {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  }

  & .react-datepicker__day-names,
  .react-datepicker__week {
    white-space: nowrap;
  }

  & .react-datepicker__day,
  .react-datepicker__month-text {
    cursor: pointer;
  }

  & .react-datepicker__day-name,
  .react-datepicker__day {
    color: ${({ theme }) => theme.colors.secondary60};
    display: inline-block;
    line-height: ${({ theme }) => theme.lineHeight.medium};
    margin: ${({ theme }) => theme.spacing.xxSmall};
    text-align: center;
    width: 1.5rem;
  }

  & .react-datepicker__day:hover {
    background: ${({ theme }) => theme.colors.primary10};
    border-radius: ${({ theme }) => theme.borderRadius.normal};
    color: ${({ theme }) => theme.colors.secondary70};
  }

  & .react-datepicker__day:focus {
    border: 4px solid ${({ theme }) => theme.colors.primary20};
    border-radius: ${({ theme }) => theme.borderRadius.normal};
    color: ${({ theme }) => theme.colors.secondary70};
  }

  & .react-datepicker__day:active {
    background: ${({ theme }) => theme.colors.primary20};
    border-radius: ${({ theme }) => theme.borderRadius.normal};
    color: ${({ theme }) => theme.colors.secondary70};
  }

  & .react-datepicker__day--today {
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }

  & .react-datepicker__day--selected {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.normal};
    color: ${({ theme }) => theme.colors.white};
  }

  & .react-datepicker__day--disabled {
    color: ${({ theme }) => theme.colors.secondary};
  }

  & .react-datepicker__day--outside-month {
    opacity: 0;
    visibility: hidden;
  }

  & .bc-datepicker {
    background: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.shadow.floating};
    display: inline-block;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    margin-top: ${({ theme }) => theme.spacing.xxSmall};
    position: relative;
  }

  & .react-datepicker-popper {
    z-index: 1;
  }
`;

StyledHeader.defaultProps = { theme: defaultTheme };
StyledDatepicker.defaultProps = { theme: defaultTheme };
