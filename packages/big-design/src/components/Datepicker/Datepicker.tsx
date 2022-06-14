import React, { forwardRef, memo, Ref, useEffect, useState } from 'react';
import { default as ReactDatePicker, registerLocale } from 'react-datepicker';

import { createLocalizationProvider } from '../../utils';
import { Input } from '../Input';

import Header from './Header';
import { StyledDatepicker } from './styled';

interface Props {
  dateFormat?: string;
  error?: React.ReactNode;
  label?: string;
  locale?: string;
  onDateChange(date: string): void;
}

export interface PrivateProps {
  forwardedRef: Ref<ReactDatePicker>;
}

export type DatepickerProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

const RawDatepicker: React.FC<DatepickerProps & PrivateProps> = ({
  dateFormat = 'EE, dd MMM, yyyy',
  disabled,
  error,
  forwardedRef,
  label,
  locale = 'en-US',
  min,
  max,
  onDateChange,
  required,
  placeholder,
  value,
  ...props
}) => {
  const [selected, setSelected] = useState<Date>();
  const localization = createLocalizationProvider(locale);

  registerLocale(locale, localization);

  const updateDate = (value: Date) => onDateChange(value ? value.toISOString() : value);

  useEffect(() => {
    if (typeof value === 'string') {
      setSelected(new Date(value));
    } else {
      setSelected(undefined);
    }
  }, [value]);

  return (
    <StyledDatepicker>
      <ReactDatePicker
        calendarClassName="bc-datepicker"
        className="calendar-input"
        customInput={<Input error={error} label={label} {...props} />}
        dateFormat={dateFormat || 'EE, dd MMM, yyyy'}
        disabled={disabled}
        locale={locale}
        maxDate={max ? new Date(max) : undefined}
        minDate={min ? new Date(min) : undefined}
        onChange={updateDate}
        placeholderText={placeholder}
        ref={forwardedRef}
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
            months={localization.monthsLong}
            nextMonthButtonDisabled={nextMonthButtonDisabled}
            prevMonthButtonDisabled={prevMonthButtonDisabled}
          />
        )}
        required={required}
        selected={selected}
      />
    </StyledDatepicker>
  );
};

export const Datepicker = memo(
  forwardRef<ReactDatePicker, DatepickerProps>((props, ref) => (
    <RawDatepicker {...props} forwardedRef={ref} />
  )),
);
