import { render, RenderOptions } from '@testing-library/react';
import React, { FC, PropsWithChildren } from 'react';
import { StyleSheetManager } from 'styled-components';

const WithoutVendorPrefixes: FC<PropsWithChildren> = ({ children }) => (
  <StyleSheetManager disableVendorPrefixes={true}>{children}</StyleSheetManager>
);

const customRender = (ui: React.ReactElement<unknown>, options: RenderOptions = {}) =>
  render(ui, { wrapper: WithoutVendorPrefixes, ...options });

// re-export everything
// eslint-disable-next-line import/export
export * from '@testing-library/react';

// override render method
// eslint-disable-next-line import/export
export { customRender as render };
