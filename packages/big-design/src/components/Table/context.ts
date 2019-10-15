import React from 'react';

type SectionContext = 'thead' | 'tbody' | 'tfoot';

export const TableSectionContext = React.createContext<SectionContext>('tbody');

interface Context {
  stickyHeader?: boolean;
}

export const TableContext = React.createContext<Context>({});
