import React from 'react';

import { StyledH0, StyledH1, StyledH2, StyledH3, StyledH4, StyledSmall, StyledText } from './styled';

// Private
export const StyleableText: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = props => <StyledText {...props} />;
export const StyleableSmall: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = props => <StyledSmall {...props} />;
export const StyleableH0: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = props => <StyledH0 {...props} />;
export const StyleableH1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = props => <StyledH1 {...props} />;
export const StyleableH2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = props => <StyledH2 {...props} />;
export const StyleableH3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = props => <StyledH3 {...props} />;
export const StyleableH4: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = props => <StyledH4 {...props} />;

// Public
export const Text: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, style, ...props }) => (
  <StyleableText {...props} />
);

export const Small: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, style, ...props }) => (
  <StyleableSmall {...props} />
);

export const H0: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, style, ...props }) => (
  <StyleableH0 {...props} />
);

export const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, style, ...props }) => (
  <StyleableH1 {...props} />
);

export const H2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, style, ...props }) => (
  <StyleableH2 {...props} />
);

export const H3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, style, ...props }) => (
  <StyleableH3 {...props} />
);

export const H4: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, style, ...props }) => (
  <StyleableH4 {...props} />
);
