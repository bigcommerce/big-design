import React from 'react';

import { NextLink, Prop, PropTable, PropTableWrapper } from '../components';

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
    types: (
      <>
        {'Array<'}
        <NextLink
          href={{
            hash: 'status-message-button-prop-table',
            query: { props: 'status-message-button' },
          }}
        >
          StatusMessageButtonProps
        </NextLink>
        {'>'}
      </>
    ),
    description: 'An array of actions to display at the bottom of the status message.',
  },
];

export const StatusMessagePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={StatusMessageProps} title="Page" {...props} />
);

const statusMessageButtonProps: Prop[] = [
  {
    name: 'text',
    types: 'string',
    description: 'The text content of the button.',
    required: true,
  },
];

export const StatusMessageButtonTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={statusMessageButtonProps} title="Header[StatusMessageButton]" {...props} />
);
