import React from 'react';

import { PropTable, PropTableWrapper } from '../components';

export const SwitchPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable nativeElement={['input', 'all']} propList={[]} title="Switch" {...props} />
);
