import React, { forwardRef, memo, Ref, useMemo } from 'react';

import { createLocalizationProvider, getTimeIntervals } from '../../utils';
import { Select } from '../Select';

interface Props {
  error?: React.ReactNode;
  label?: React.ReactChild;
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
  const localization = createLocalizationProvider(locale);
  const options = useMemo(() => getTimeIntervals(localization), [localization]);

  return (
    <Select
      autoWidth={true}
      error={error}
      inputRef={forwardedRef}
      label={label}
      onOptionChange={onTimeChange}
      options={options}
      placeholder="hh : mm"
      value={value}
      {...props}
    />
  );
};

export const Timepicker = memo(
  forwardRef<HTMLInputElement, TimepickerProps>(({ className, style, ...props }, ref) => (
    <RawTimePicker {...props} forwardedRef={ref} />
  )),
);
