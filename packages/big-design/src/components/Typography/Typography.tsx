import React from 'react';

import { MarginProps } from '../../mixins';

import { StyledH0, StyledH1, StyledH2, StyledH3, StyledH4, StyledSmall, StyledText } from './styled';

export interface TypographyProps {
  ellipsis?: boolean;
}

export type TextProps = React.HTMLAttributes<HTMLParagraphElement> & MarginProps & TypographyProps;
export type SmallProps = React.HTMLAttributes<HTMLParagraphElement> & MarginProps & TypographyProps;
export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & MarginProps & TypographyProps;

// Private
export const StyleableText = StyledText;
export const StyleableSmall = StyledSmall;
export const StyleableH0 = StyledH0;
export const StyleableH1 = StyledH1;
export const StyleableH2 = StyledH2;
export const StyleableH3 = StyledH3;
export const StyleableH4 = StyledH4;

// Public
export const Text: React.FC<TextProps> = ({ className, style, ...props }) => <StyleableText {...props} />;
export const Small: React.FC<SmallProps> = ({ className, style, ...props }) => <StyleableSmall {...props} />;
export const H0: React.FC<HeadingProps> = ({ className, style, ...props }) => <StyleableH0 {...props} />;
export const H1: React.FC<HeadingProps> = ({ className, style, ...props }) => <StyleableH1 {...props} />;
export const H2: React.FC<HeadingProps> = ({ className, style, ...props }) => <StyleableH2 {...props} />;
export const H3: React.FC<HeadingProps> = ({ className, style, ...props }) => <StyleableH3 {...props} />;
export const H4: React.FC<HeadingProps> = ({ className, style, ...props }) => <StyleableH4 {...props} />;
