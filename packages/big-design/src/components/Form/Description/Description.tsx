import React, { useMemo } from 'react';

import { LinkProps } from '../../Link';
import { Small, TextProps } from '../../Typography';

import { StyledLink } from './styled';

export interface FormControlDescriptionProps {
  link?: FormControlDescriptionLinkProps;
}

export type FormControlDescriptionLinkProps = Pick<LinkProps, 'external' | 'href' | 'target'> & {
  text: string;
};

export const FormControlDescription: React.FC<TextProps & FormControlDescriptionProps> = ({
  className,
  style,
  link,
  ...props
}) => {
  const renderedDescriptionLink = useMemo(() => {
    if (!link) {
      return;
    }

    return (
      link && (
        <>
          {' '}
          <StyledLink {...link}>{link.text}</StyledLink>
        </>
      )
    );
  }, [link]);

  return (
    <Small {...props}>
      {props.children}
      {renderedDescriptionLink}
    </Small>
  );
};
