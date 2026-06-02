import { createContext, useContext } from 'react';

interface CollapseContextValue {
  isOpen: boolean;
  toggle: () => void;
  disabled?: boolean;
  triggerId: string;
  panelId: string;
}

export const CollapseContext = createContext<CollapseContextValue | null>(null);

export const useCollapseContext = (componentName: string): CollapseContextValue => {
  const context = useContext(CollapseContext);

  if (!context) {
    throw new Error(`${componentName} must be used inside a <Collapse> component.`);
  }

  return context;
};
