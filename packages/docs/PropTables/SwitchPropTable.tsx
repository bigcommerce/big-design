import React from 'react';

import { PropTable, PropTableWrapper } from '../components';

export const SwitchPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Switch" propList={[]} nativeElement={['input', 'all']} {...props} />
);
