import { ThemeInterface } from '@bigcommerce/big-design-theme';
import React, { forwardRef, memo, Ref } from 'react';
import ReactDatePicker from 'react-datepicker';

import { Input } from '../Input';

import Header from './Header';
import { StyledDatepicker } from './styled';

interface Props {
  forwardedRef?: Ref<HTMLInputElement>;
  label?: string;
  maxDate?: Date;
  minDate?: Date;
  required?: boolean;
  selected?: Date | null;
  filterDate?(date: Date): boolean;
  onChange(date: Date | null, event: React.SyntheticEvent<any> | undefined): void;
}

export interface ExtraProps {
  forwardedRef: Ref<HTMLInputElement>;
  theme?: ThemeInterface;
}

export type DatepickerProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

const RawDatePicker: React.FC<DatepickerProps & ExtraProps> = ({
  filterDate,
  forwardedRef,
  label,
  maxDate,
  minDate,
  required,
  selected,
  theme,
  onChange,
}) => (
  <StyledDatepicker theme={theme} forwardedRef={forwardedRef}>
    <ReactDatePicker
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <Header
          date={date}
          decreaseMonth={decreaseMonth}
          increaseMonth={increaseMonth}
          prevMonthButtonDisabled={prevMonthButtonDisabled}
          nextMonthButtonDisabled={nextMonthButtonDisabled}
        />
      )}
      customInput={<Input label={label} />}
      className="calendar-input"
      calendarClassName="bc-datepicker"
      disabledKeyboardNavigation
      dateFormat="EE, dd MMM, yyyy"
      filterDate={filterDate}
      maxDate={maxDate}
      minDate={minDate}
      selected={selected}
      placeholderText="DD /MM /YYYY"
      required={required}
      onChange={onChange}
    />
  </StyledDatepicker>
);

export const Datepicker = memo(
  forwardRef<HTMLInputElement, DatepickerProps>((props, ref) => <RawDatePicker {...props} forwardedRef={ref} />),
);
