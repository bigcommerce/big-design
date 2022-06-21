import { render, RenderOptions } from '@testing-library/react';
import React from 'react';
import { UIDReset } from 'react-uid';

const BigDesignWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <UIDReset>{children}</UIDReset>;
};

const customRender = (ui: React.ReactElement<unknown>, options: RenderOptions = {}) =>
  render(ui, { wrapper: BigDesignWrapper, ...options });

// re-export everything
// eslint-disable-next-line import/export
export * from '@testing-library/react';

// override render method
// eslint-disable-next-line import/export
export { customRender as render };
