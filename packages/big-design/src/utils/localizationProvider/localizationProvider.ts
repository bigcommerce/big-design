interface LocalizationProviderInterface {
  code?: string;
  localize?: {
    month(n: number): string;
    day(n: number): string;
  };
  monthsLong?: string[];
  formatLong?: Record<string, unknown>;
  formatTime(date: Date): string;
}

function getTimeIntervals24hr() {
  const times = ['00:00'];

  for (let i = 1; i < 24; i++) {
    times.push(`${i}:00`);
  }
  times.push('23:59');

  return times.map((time) => ({ value: time, content: time }));
}

const defaultTimeIntervals = getTimeIntervals24hr();

export const createLocalizationProvider = (locale: string) => {
  const dayFormatter = Intl.DateTimeFormat(locale, {
    weekday: 'short',
  });
  const monthFormatter = Intl.DateTimeFormat(locale, {
    month: 'long',
  });

  const monthsLong = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) =>
    monthFormatter.format(new Date(0, month, 1)),
  );

  const daysShort = [0, 1, 2, 3, 4, 5, 6].map((day) => dayFormatter.format(new Date(0, 9, day, 12)));

  const timeFormatter = Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
  });

  return {
    code: locale,
    localize: {
      month: (n: number) => monthsLong[n],
      day: (n: number) => daysShort[n],
    },
    monthsLong,
    // Required by datepicker.
    formatLong: {},
    formatTime: timeFormatter.format,
  };
};

export function getTimeIntervals(localization: LocalizationProviderInterface) {
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
