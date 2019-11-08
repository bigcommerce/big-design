import React, { memo } from 'react';

import { StyledH0, StyledH1, StyledH2, StyledH3, StyledH4, StyledSmall, StyledText } from './styled';
import { HeadingProps, HeadingTag, TextProps } from './types';

const validHeadingTags = new Set<HeadingTag>(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

// Private
export const StyleableText = StyledText;
export const StyleableSmall = StyledSmall;
export const StyleableH0 = StyledH0;
export const StyleableH1 = StyledH1;
export const StyleableH2 = StyledH2;
export const StyleableH3 = StyledH3;
export const StyleableH4 = StyledH4;

// Public
export const Text: React.FC<TextProps> = memo(({ className, style, ...props }) => <StyleableText {...props} />);
export const Small: React.FC<TextProps> = memo(({ className, style, ...props }) => <StyleableSmall {...props} />);

export const H0: React.FC<HeadingProps> = memo(({ className, style, as, ...props }) => (
  <StyleableH0 as={getHeadingTag('h1', as)} {...props} />
));

export const H1: React.FC<HeadingProps> = memo(({ className, style, as, ...props }) => (
  <StyleableH1 as={getHeadingTag('h1', as)} {...props} />
));

export const H2: React.FC<HeadingProps> = memo(({ className, style, as, ...props }) => (
  <StyleableH2 as={getHeadingTag('h2', as)} {...props} />
));

export const H3: React.FC<HeadingProps> = memo(({ className, style, as, ...props }) => (
  <StyleableH3 as={getHeadingTag('h3', as)} {...props} />
));

export const H4: React.FC<HeadingProps> = memo(({ className, style, as, ...props }) => (
  <StyleableH4 as={getHeadingTag('h4', as)} {...props} />
));

const getHeadingTag = (defaultTag: HeadingTag, tag?: HeadingTag): HeadingTag => {
  return tag && validHeadingTags.has(tag) ? tag : defaultTag;
};
