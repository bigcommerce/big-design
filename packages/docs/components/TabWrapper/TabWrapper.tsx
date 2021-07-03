import React, { createContext, useState } from 'react';

interface Context {
  activeTab: string;
  setActiveTab(activeTab: string): void;
}

export const ActiveTabContext = createContext<Context>({
  activeTab: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setActiveTab: () => null,
});

export const TabWrapper: React.FC = (props) => {
  const [openTab, setOpenTab] = useState('examples');
  const setTab = (newTab) => setOpenTab(newTab);

  return (
    <ActiveTabContext.Provider value={{ activeTab: openTab, setActiveTab: setTab }}>
      {props.children}
    </ActiveTabContext.Provider>
  );
};
