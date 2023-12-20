import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

export const sharedMessagingProps: Prop[] = [
  {
    name: 'header',
    types: 'string',
    description: 'Optional header to display in message.',
  },
  {
    name: 'messages',
    types: (
      <NextLink href={{ hash: 'message-item-prop-table', query: { props: 'message-item' } }}>
        MessageItem
      </NextLink>
    ),
    description: (
      <>
        See{' '}
        <NextLink href={{ hash: 'message-item-prop-table', query: { props: 'message-item' } }}>
          MessageItem
        </NextLink>{' '}
        for usage.
      </>
    ),
    required: true,
  },
  {
    name: 'type',
    types: ['success', 'error', 'warning', 'info'],
    description: 'Determines the style of message to display.',
    defaultValue: 'success',
  },
  {
    name: 'onClose',
    types: '() => void',
    description: 'Function that will be called on close events.',
  },
];

const messagingItemProps: Prop[] = [
  {
    name: 'text',
    types: 'string',
    description: 'Message to be displayed.',
    required: true,
  },
  {
    name: 'link',
    types: (
      <NextLink
        href={{ hash: 'message-link-item-prop-table', query: { props: 'message-link-item' } }}
      >
        MessageLinkItem
      </NextLink>
    ),
    description: (
      <>
        See{' '}
        <NextLink
          href={{ hash: 'message-link-item-prop-table', query: { props: 'message-link-item' } }}
        >
          MessageLinkItem
        </NextLink>{' '}
        for usage.
      </>
    ),
  },
];

export const messagingLinkItemProps: Prop[] = [
  {
    name: 'external',
    types: 'boolean',
    description: (
      <>
        Shows an external icon when the <Code primary>external</Code> prop is set and
        target="_blank".
      </>
    ),
  },
  {
    name: 'href',
    types: 'string',
    description: 'Same as a HTML anchor href attribute.',
  },
  {
    name: 'text',
    types: 'string',
    description: 'Link text to display.',
  },
  {
    name: 'target',
    types: 'string',
    description: 'Same as a HTML anchor target attribute.',
  },
];

export const MessagingItemPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={messagingItemProps} title="" {...props} id="message-item-prop-table" />
);

export const MessagingLinkItemPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable
    propList={messagingLinkItemProps}
    title=""
    {...props}
    id="message-link-item-prop-table"
  />
);
