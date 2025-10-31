import { render } from '@testing-library/react';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

import 'jest-styled-components';

import { GlobalStyles } from './GlobalStyles';

test('renders global styles', () => {
  const sheet = new ServerStyleSheet();

  try {
    const html = sheet.collectStyles(<GlobalStyles />);

    render(html);

    const styles = sheet.getStyleTags();

    expect(styles).toContain('body');
    expect(styles).toContain('Source Sans Pro');
  } finally {
    sheet.seal();
  }
});
