import React, { forwardRef, memo, Ref } from 'react';

import { Select } from '../Select';

interface Props {
  error?: React.ReactNode;
  label?: string;
  onTimeChange(date: string): void;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export type TimepickerProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

function getTimeIntervals() {
  const times = ['12:00 AM'];

  for (let i = 1; i < 24; i++) {
    i < 12 ? times.push(`${i}:00 AM`) : times.push(`${i === 12 ? i : i - 12}:00 PM`);
  }
  times.push('11:59 PM');

  return times.map((time) => ({ value: time, content: time }));
}

const RawTimePicker: React.FC<TimepickerProps & PrivateProps> = ({
  error,
  forwardedRef,
  label,
  onTimeChange,
  value,
  ...props
}) => {
  return (
    <Select
      autoWidth={true}
      label={label}
      error={error}
      value={value}
      onOptionChange={onTimeChange}
      placeholder="hh : mm"
      options={getTimeIntervals()}
      inputRef={forwardedRef}
      {...props}
    />
  );
};

export const Timepicker = memo(
  forwardRef<HTMLInputElement, TimepickerProps>((props, ref) => <RawTimePicker {...props} forwardedRef={ref} />),
);
