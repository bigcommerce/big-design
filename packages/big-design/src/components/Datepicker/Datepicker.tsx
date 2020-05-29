import { Input } from '@bigcommerce/big-design';
import { ThemeInterface } from '@bigcommerce/big-design-theme';
import React, { forwardRef, memo, Ref } from 'react';
import ReactDatePicker from 'react-datepicker';

import Header from './Header';
import { StyledDatepicker } from './styled';

interface Props {
  forwardedRef?: Ref<HTMLInputElement>;
  label?: string;
  maxDate?: Date;
  minDate?: Date;
  required?: boolean;
  value?: Date;
  theme?: ThemeInterface;
  filterDate?(date: Date): boolean;
  onDateChange(date: Date): void;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export type DatepickerProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

const RawDatePicker: React.FC<DatepickerProps & PrivateProps> = ({
  filterDate,
  forwardedRef,
  label,
  maxDate,
  minDate,
  onDateChange,
  required,
  value,
  theme,
}) => (
  <StyledDatepicker theme={theme} ref={forwardedRef}>
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
      selected={value}
      placeholderText="DD /MM /YYYY"
      required={required}
      onChange={onDateChange}
    />
  </StyledDatepicker>
);

export const Datepicker = memo(
  forwardRef<HTMLInputElement, DatepickerProps>((props, ref) => <RawDatePicker {...props} forwardedRef={ref} />),
);
