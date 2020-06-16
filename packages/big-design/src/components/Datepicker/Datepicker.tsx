import { enAU, enCA, enGB, enUS } from 'date-fns/locale';
import React, { forwardRef, memo, Ref } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';

registerLocale('en-US', enUS);
registerLocale('en-GB', enGB);
registerLocale('en-AU', enAU);
registerLocale('en-CA', enCA);

import { Input } from '../Input';

import Header from './Header';
import { StyledDatepicker } from './styled';

export interface Props {
  ariaLabel?: string;
  dateFormat?: string;
  error?: React.ReactNode;
  label?: string;
  locale?: string;
  maxDate?: string;
  minDate?: string;
  placeholder?: string;
  required?: boolean;
  selected?: string | null;
  filterDate?(date: Date): boolean;
  onDateChange(date: string): void;
}

export interface PrivateProps {
  forwardedRef: Ref<ReactDatePicker>;
}

export type DatepickerProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

const RawDatePicker: React.FC<DatepickerProps & PrivateProps> = ({
  dateFormat = 'EE, dd MMM, yyyy',
  error,
  filterDate,
  forwardedRef,
  label,
  locale = 'en-US',
  maxDate,
  minDate,
  placeholder,
  required,
  selected,
  onDateChange,
  ...props
}) => {
  const updateDate: (value: Date) => void = (value) => onDateChange(value.toISOString());

  return (
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
        customInput={<Input label={label} error={error} {...props} />}
        className="calendar-input"
        calendarClassName="bc-datepicker"
        dateFormat={dateFormat || 'EE, dd MMM, yyyy'}
        filterDate={filterDate}
        locale={locale}
        maxDate={maxDate ? new Date(maxDate) : null}
        minDate={minDate ? new Date(minDate) : null}
        selected={selected ? new Date(selected) : null}
        placeholderText={placeholder}
        required={required}
        onChange={updateDate}
        ref={forwardedRef}
      />
    </StyledDatepicker>
  );
};

export const Datepicker = memo(
  forwardRef<ReactDatePicker, DatepickerProps>((props, ref) => <RawDatePicker {...props} forwardedRef={ref} />),
);
