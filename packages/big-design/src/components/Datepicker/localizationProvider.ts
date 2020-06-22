export const createLocalizationProvider = (locale: string) => {
  const dayFormatter = Intl.DateTimeFormat(locale, {
    weekday: 'short',
  });
  const monthFormatter = Intl.DateTimeFormat(locale, {
    month: 'long',
  });

  const monthsLong = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) =>
    // Date chosen for no real reason, the only important part is the month
    monthFormatter.format(new Date(2000, month, 1)),
  );

  const daysShort = [1, 2, 3, 4, 5, 6, 7].map((day) =>
    // Some short days are longer than 3 characters but are unique if the first
    // three non-white characters are used.
    dayFormatter
      // Date range chosen which has a Sun-Sat range so we can extract the names
      .format(new Date(2000, 9, day, 12))
      // \u200E matches on the Left-to-Right Mark character in IE/Edge
      .replace(/[\s\u200E]/g, '')
      .substring(0, 3),
  );

  return {
    code: locale,
    localize: {
      month: (n: number) => monthsLong[n],
      day: (n: number) => daysShort[n],
    },
    monthsLong,
    // Required by datepicker.
    formatLong: {},
  };
};
