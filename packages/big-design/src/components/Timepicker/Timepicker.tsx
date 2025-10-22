import React, { ComponentPropsWithoutRef, forwardRef, memo, Ref, useMemo } from 'react';

import { createLocalizationProvider, getTimeIntervals } from '../../utils';
import { Select } from '../Select';

interface Props {
  readonly error?: React.ReactNode;
  readonly label?: React.ReactNode;
  readonly locale?: string;
  onTimeChange(date: string): void;
}

interface PrivateProps {
  readonly forwardedRef: Ref<HTMLInputElement>;
}

export type TimepickerProps = Props & ComponentPropsWithoutRef<'input'>;

const RawTimePicker: React.FC<TimepickerProps & PrivateProps> = ({
  error,
  forwardedRef,
  label,
  locale = 'en-US',
  onTimeChange,
  value,
  ...props
}) => {
  const localizationProvider = createLocalizationProvider(locale);
  const options = useMemo(() => getTimeIntervals(localizationProvider), [localizationProvider]);

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
