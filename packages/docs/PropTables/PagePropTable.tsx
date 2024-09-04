import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const pageProps: Prop[] = [
  {
    name: 'header',
    types: <NextLink href="/header">Header</NextLink>,
    description: (
      <>
        Pass in an optional <NextLink href="/header">Header</NextLink> component for displaying the
        page title and description.
      </>
    ),
  },
  {
    name: 'message',
    types: <NextLink href="/message?props=inline-message">MessageProps</NextLink>,
    description: (
      <>
        An optional <Code primary>Message</Code> component for displaying alerts or notifications.
      </>
    ),
  },
  {
    name: 'background',
    types: (
      <NextLink href={{ hash: 'props', query: { props: 'background-props' } }}>Background</NextLink>
    ),
    description: 'The background settings for the page, determining background color or image.',
  },
  {
    name: 'actionBar',
    types: <NextLink href="/action-bar">ActionBar</NextLink>,
    description: (
      <>
        Pass in an optional <NextLink href="/action-bar">ActionBar</NextLink> component for
        displaying action buttons at the bottom.
      </>
    ),
  },
];

export const PagePropsTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={pageProps} title="Page" {...props} />
);

const backgroundProps: Prop[] = [
  {
    name: 'src',
    types: 'string',
    description: 'The URL of the background image.',
    required: true,
  },
  {
    name: 'backgroundSize',
    types: (
      <>
        auto | length | cover | <br />
        contain | initial | inherit
      </>
    ),
    defaultValue: 'contain',
    description: (
      <>
        Defines the size of the background image. Same as the{' '}
        <Code highlight={false}>background-size</Code> CSS property.
      </>
    ),
  },
  {
    name: 'backgroundPosition',
    types: (
      <>
        left top | left center | left bottom | <br />
        right top | right center | right bottom | <br />
        center top | center center | center bottom | <br />
        x% y% | x-pos y-pos | initial | inherit
      </>
    ),
    defaultValue: 'top right',
    description: (
      <>
        Sets the position of the background image. Same as the{' '}
        <Code highlight={false}>background-position</Code> CSS property.
      </>
    ),
  },
  {
    name: 'backgroundRepeat',
    defaultValue: 'no-repeat',
    types: (
      <>
        repeat | repeat-x | repeat-y | <br />
        no-repeat | initial | inherit
      </>
    ),
    description: (
      <>
        Specifies if/how the background image repeats. Same as the{' '}
        <Code highlight={false}>background-repeat</Code> CSS property.
      </>
    ),
  },
];

export const BackgroundPropsTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={backgroundProps} title="Page[Background]" {...props} />
);
