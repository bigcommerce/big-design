import { Colors, ThemeInterface } from '@bigcommerce/big-design-theme';
import React from 'react';

import { MarginProps } from '../../mixins';

export interface TypographyProps {
  color?: keyof Colors;
  ellipsis?: boolean;
  theme?: ThemeInterface;
}

export interface TextModifiers {
  bold?: boolean;
  capitalize?: boolean;
  italic?: boolean;
  lowercase?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  uppercase?: boolean;
}

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TextTag =
  | 'abbr'
  | 'b'
  | 'bdi'
  | 'bdo'
  | 'blockquote'
  | 'caption'
  | 'cite'
  | 'code'
  | 'em'
  | 'figcaption'
  | 'i'
  | 'label'
  | 'legend'
  | 'p'
  | 'pre'
  | 'q'
  | 's'
  | 'small'
  | 'span'
  | 'strong'
  | 'title';

export type TextProps = React.HTMLAttributes<HTMLParagraphElement> &
  MarginProps &
  TypographyProps &
  TextModifiers & {
    as?: TextTag;
  };

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  MarginProps &
  TypographyProps & {
    as?: HeadingTag;
  };
