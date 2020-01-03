import { render, RenderOptions } from '@testing-library/react';
import React from 'react';
import { UIDReset } from 'react-uid';

const BigDesignWrapper: React.FC = ({ children }) => {
  return <UIDReset>{children}</UIDReset>;
};

const customRender = (ui: React.ReactElement<any>, options: RenderOptions = {}) =>
  render(ui, { wrapper: BigDesignWrapper, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
