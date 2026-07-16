import { ThemeInterface } from '@bigcommerce/big-design-theme';

/**
 * Maps the live JS theme to CSS custom properties that override @theme defaults.
 * Keeps rem-scaled tokens (spacing, type, radius, line-height) in sync with
 * createTheme({ htmlFontSize }).
 */
export const themeToCssVariables = (theme: ThemeInterface): string => {
  const declarations: string[] = [
    `--font-sans: ${theme.typography.fontFamily}`,

    `--breakpoint-mobile: ${theme.breakpointValues.mobile}`,
    `--breakpoint-tablet: ${theme.breakpointValues.tablet}`,
    `--breakpoint-desktop: ${theme.breakpointValues.desktop}`,
    `--breakpoint-wide: ${theme.breakpointValues.wide}`,
  ];

  (Object.keys(theme.colors) as Array<keyof typeof theme.colors>).forEach((key) => {
    declarations.push(`--color-${key}: ${theme.colors[key]}`);
  });

  (Object.keys(theme.spacing) as Array<keyof typeof theme.spacing>).forEach((key) => {
    declarations.push(`--spacing-${key}: ${theme.spacing[key]}`);
  });

  (Object.keys(theme.typography.fontSize) as Array<keyof typeof theme.typography.fontSize>).forEach(
    (key) => {
      declarations.push(`--text-${key}: ${theme.typography.fontSize[key]}`);
    },
  );

  (
    Object.keys(theme.typography.fontWeight) as Array<keyof typeof theme.typography.fontWeight>
  ).forEach((key) => {
    declarations.push(`--font-weight-${key}: ${theme.typography.fontWeight[key]}`);
  });

  (Object.keys(theme.lineHeight) as Array<keyof typeof theme.lineHeight>).forEach((key) => {
    declarations.push(`--leading-${key}: ${theme.lineHeight[key]}`);
  });

  (Object.keys(theme.borderRadius) as Array<keyof typeof theme.borderRadius>).forEach((key) => {
    declarations.push(`--radius-${key}: ${theme.borderRadius[key]}`);
  });

  (Object.keys(theme.zIndex) as Array<keyof typeof theme.zIndex>).forEach((key) => {
    declarations.push(`--z-index-${key}: ${theme.zIndex[key]}`);
  });

  return declarations.join(';\n    ') + ';';
};
