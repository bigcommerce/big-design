import { createContext, useContext } from 'react';

interface FormContextProps {
  fullWidth?: boolean;
}

export const FormContext = createContext<FormContextProps>({});

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useFormContext must be used within a FormContext');
  }

  return context;
};
