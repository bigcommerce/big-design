import React, { forwardRef, memo, Ref } from 'react';
import ReactDatePicker from 'react-datepicker';

import { Input } from '../Input';

import Header from './Header';
import { StyledDatepicker } from './styled';

export interface DatepickerProps {
  ariaLabel?: string;
  dateFormat?: string;
  error?: React.ReactNode;
  label?: string;
  locale?: string;
  maxDate?: Date;
  minDate?: Date;
  placeholder?: string;
  required?: boolean;
  selected?: Date | null;
  filterDate?(date: Date): boolean;
  onChange(date: Date): void;
}

export interface PrivateProps {
  forwardedRef: Ref<ReactDatePicker>;
}

const RawDatePicker: React.FC<DatepickerProps & PrivateProps> = ({
  ariaLabel,
  dateFormat,
  error,
  filterDate,
  forwardedRef,
  label,
  locale,
  maxDate,
  minDate,
  placeholder,
  required,
  selected,
  onChange,
}) => (
  <StyledDatepicker>
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
      ariaLabelledBy={ariaLabel}
      customInput={<Input label={label} error={error} />}
      className="calendar-input"
      calendarClassName="bc-datepicker"
      dateFormat={dateFormat || 'EE, dd MMM, yyyy'}
      filterDate={filterDate}
      locale={locale}
      maxDate={maxDate}
      minDate={minDate}
      selected={selected}
      placeholderText={placeholder}
      required={required}
      onChange={onChange}
      ref={forwardedRef}
    />
  </StyledDatepicker>
);

export const Datepicker = memo(
  forwardRef<ReactDatePicker, DatepickerProps>((props, ref) => <RawDatePicker {...props} forwardedRef={ref} />),
);
