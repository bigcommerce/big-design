import {
  excludeMarginProps,
  excludePaddingProps,
  Message,
  MessageProps,
} from '@bigcommerce/big-design';
import React, { isValidElement, PropsWithChildren, ReactNode } from 'react';

import { warning } from '../../utils';
import { Header } from '../Header';

import { Background, StyledPage, StyledPageBackground } from './styled';

export interface PageProps extends PropsWithChildren {
  header?: ReactNode;
  message?: MessageProps;
  background?: Background;
}

const PageHeader = ({ header }: Pick<PageProps, 'header'>) => {
  if (isValidElement(header) && header.type !== Header) {
    warning('A `Header` component is required for the `header` prop.');

    return null;
  }

  return header;
};

const PageMessage = ({ message }: Required<Pick<PageProps, 'message'>>) => {
  const messageProps = excludeMarginProps(excludePaddingProps(message));

  if ('messages' in messageProps && messageProps.messages.length > 0) {
    return <Message {...messageProps} />;
  }

  return null;
};

export const Page = ({ children, header, message, background }: PageProps) => {
  return (
    <StyledPageBackground background={background}>
      <StyledPage
        flexDirection="column"
        flexGap="1.5rem"
        padding={{ mobile: 'medium', tablet: 'xxLarge' }}
      >
        <PageHeader header={header} />
        {message ? <PageMessage message={message} /> : null}
        <main>{children}</main>
      </StyledPage>
    </StyledPageBackground>
  );
};
