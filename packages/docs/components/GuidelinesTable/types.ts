import React from 'react';

export interface GuidelinesTableProps {
  recommended: Array<React.JSX.Element | string>;
  discouraged: Array<React.JSX.Element | string>;
}
