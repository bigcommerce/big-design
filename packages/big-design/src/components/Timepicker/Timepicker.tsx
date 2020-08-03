import React, { forwardRef, memo, Ref } from 'react';

import { createLocalizationProvider } from '../../utils';
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

function getTimeIntervals24hr() {
  const times = ['00:00'];

  for (let i = 1; i < 24; i++) {
    times.push(`${i}:00`);
  }
  times.push('23:59');

  return times.map((time) => ({ value: time, content: time }));
}

const defaultTimeIntervals = getTimeIntervals24hr();

function getTimeIntervals(locale: string) {
  const localization = createLocalizationProvider(locale);
  const localizedTimeIntervals = defaultTimeIntervals.map((time) => {
    const baseDate = new Date();
    const [hour, minute] = time.value.split(':');
    baseDate.setHours(parseInt(hour, 10));
    baseDate.setMinutes(parseInt(minute, 0));

    return {
      content: localization.formatTime(baseDate),
      value: time.value,
    };
  });

  return localizedTimeIntervals;
}

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
