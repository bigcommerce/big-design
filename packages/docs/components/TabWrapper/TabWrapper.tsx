import React, { createContext, useState } from 'react';

interface Context {
  activeTab: string;
  setActiveTab(activeTab: string): void;
}

export const ActiveTabContext = createContext<Context>({
  activeTab: '',

  setActiveTab: () => null,
});

export const TabWrapper: React.FC = ({ children }) => {
  const [openTab, setOpenTab] = useState('examples');
  const setTab = (newTab: string) => setOpenTab(newTab);

  return (
    <ActiveTabContext.Provider value={{ activeTab: openTab, setActiveTab: setTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
};
