import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const StatusMessageProps: Prop[] = [
  {
    name: 'heading',
    types: 'string',
    description: `The heading message to display. This is optional and can be omitted if not needed.`,
  },
  {
    name: 'message',
    types: 'string',
    description: `The main message to display. This is required.`,
  },
  {
    name: 'variant',
    types: ['404', 'info', 'search', 'error', 'server-error', 'success', 'unauthorized', 'warning'],
    defaultValue: 'info',
    description: `The variant of the status message. This determines the icon and background pattern used.`,
  },
  {
    name: 'size',
    types: ['panel', 'page'],
    defaultValue: 'panel',
    description: `The size of the status message. This determines the layout and spacing of the message.`,
  },
  {
    name: 'actions',
    types: 'React.ReactNode',
    description: 'Component to render custom actions. This can be a button or any other interactive element. It is optional.',
  },
];

export const StatusMessagePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={StatusMessageProps} title="Page" {...props} />
);
