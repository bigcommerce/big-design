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

  const daysShort = [1, 2, 3, 4, 5, 6, 7].map((day) => dayFormatter.format(new Date(0, 9, day, 12)));

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
