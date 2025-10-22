import {
  excludeMarginProps,
  excludePaddingProps,
  Message,
  MessageProps,
} from '@bigcommerce/big-design';
import React, { isValidElement, PropsWithChildren, ReactNode } from 'react';

import { warning } from '../../utils';
import { ActionBar } from '../ActionBar';
import { Header } from '../Header';

import { Background, StyledPage, StyledPageBackground } from './styled';

export interface PageProps extends PropsWithChildren {
  readonly header?: ReactNode;
  readonly message?: MessageProps;
  readonly background?: Background;
  readonly actionBar?: ReactNode;
}

const PageHeader = ({ header }: Pick<PageProps, 'header'>) => {
  if (isValidElement(header) && header.type !== Header) {
    warning('A `Header` component is required for the `header` prop.');

    return null;
  }

  return header;
};

const PageActionBar = ({ actionBar }: Required<Pick<PageProps, 'actionBar'>>) => {
  if (isValidElement(actionBar) && actionBar.type !== ActionBar) {
    warning('An `ActionBar` component is required for the `actionBar` prop.');

    return null;
  }

  return actionBar;
};

const PageMessage = ({ message }: Required<Pick<PageProps, 'message'>>) => {
  const messageProps = excludeMarginProps(excludePaddingProps(message));

  if ('messages' in messageProps && messageProps.messages.length > 0) {
    return <Message {...messageProps} />;
  }

  return null;
};

export const Page = ({ actionBar, background, children, header, message }: PageProps) => {
  return (
    <StyledPageBackground
      background={background}
      backgroundColor="secondary10"
      data-testid="page-background"
      gridGap="0"
      gridTemplate="1fr auto / auto"
    >
      <StyledPage
        flexDirection="column"
        flexGap="1.5rem"
        padding={{ mobile: 'medium', tablet: 'xxLarge' }}
      >
        <PageHeader header={header} />
        {message ? <PageMessage message={message} /> : null}
        <main>{children}</main>
      </StyledPage>
      {actionBar ? <PageActionBar actionBar={actionBar} /> : null}
    </StyledPageBackground>
  );
};
