import React, { forwardRef, memo, Ref, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';

import { createLocalizationProvider } from '../../utils';
import { Input } from '../Input';

import Header from './Header';
import { StyledDatepicker } from './styled';

export interface Props {
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
  const updateDate = (value: Date) => onDateChange(value.toISOString());

  useEffect(() => {
    if (typeof value === 'string') {
      setSelected(new Date(value as string));
    } else {
      setSelected(undefined);
    }
  }, [value]);

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
            months={localization.monthsLong}
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
        locale={locale}
        maxDate={max ? new Date(max) : undefined}
        minDate={min ? new Date(min) : undefined}
        selected={selected}
        placeholderText={placeholder}
        required={required}
        onChange={updateDate}
        ref={forwardedRef}
      />
    </StyledDatepicker>
  );
};

export const Datepicker = memo(
  forwardRef<ReactDatePicker, DatepickerProps>((props, ref) => <RawDatepicker {...props} forwardedRef={ref} />),
);
