import React from 'react';

import { PropTable, PropTableWrapper } from '../components';

import { sharedMessagingProps } from './shared';

export const MessagePropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Message" propList={sharedMessagingProps} {...props} />
);
