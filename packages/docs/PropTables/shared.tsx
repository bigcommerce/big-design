import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

export const sharedMessagingProps: Prop[] = [
  {
    name: 'header',
    types: 'string',
    description: 'Optional header to display in message.',
  },
  {
    name: 'messages',
    types: <NextLink href="#message-item-prop-table">MessageItem</NextLink>,
    description: (
      <>
        See <NextLink href="#message-item-prop-table">below</NextLink> for usage.
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
    types: <NextLink href="#message-link-item-prop-table">MessageLinkItem</NextLink>,
    description: (
      <>
        See <NextLink href="#message-link-item-prop-table">below</NextLink> for usage.
      </>
    ),
  },
];

const messagingLinkItemProps: Prop[] = [
  {
    name: 'external',
    types: 'boolean',
    description: (
      <>
        Shows an external icons when the <Code primary>external</Code> flag is set and target="_blank".
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

export const MessagingItemPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="" propList={messagingItemProps} {...props} id="message-item-prop-table" />
);

export const MessagingLinkItemPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="" propList={messagingLinkItemProps} {...props} id="message-link-item-prop-table" />
);
