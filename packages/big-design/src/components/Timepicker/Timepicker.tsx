import React, { forwardRef, memo, Ref } from 'react';

import { getTimeIntervals } from '../../utils';
import { Select } from '../Select';
interface Props {
  error?: React.ReactNode;
  label?: string;
  locale?: string;
  onTimeChange(date: string): void;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export type TimepickerProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

const RawTimePicker: React.FC<TimepickerProps & PrivateProps> = ({
  error,
  forwardedRef,
  label,
  locale = 'en-US',
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
      options={getTimeIntervals(locale)}
      inputRef={forwardedRef}
      {...props}
    />
  );
};

export const Timepicker = memo(
  forwardRef<HTMLInputElement, TimepickerProps>((props, ref) => <RawTimePicker {...props} forwardedRef={ref} />),
);
