import { render, RenderOptions } from '@testing-library/react';
import React from 'react';

const customRender = (ui: React.ReactElement<unknown>, options: RenderOptions = {}) =>
  render(ui, options);

// re-export everything
// eslint-disable-next-line import/export
export * from '@testing-library/react';

// override render method
// eslint-disable-next-line import/export
export { customRender as render };
