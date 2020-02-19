import React from 'react';

import { PropTable, PropTableWrapper } from '../components';

import { sharedMessagingProps } from './shared';

export const InlineAlertPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="InlineAlert" propList={sharedMessagingProps} {...props} />
);
