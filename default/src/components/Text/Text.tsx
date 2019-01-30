import React from 'react';

import { StyledH0, StyledH1, StyledH2, StyledH3, StyledH4, StyledSmall, StyledText } from './styled';

export const H0: React.SFC<{}> = props => <StyledH0 {...props} />;

export const H1: React.SFC<{}> = props => <StyledH1 {...props} />;

export const H2: React.SFC<{}> = props => <StyledH2 {...props} />;

export const H3: React.SFC<{}> = props => <StyledH3 {...props} />;

export const H4: React.SFC<{}> = props => <StyledH4 {...props} />;

export const Text: React.SFC<{}> = props => <StyledText {...props} />;

export const Small: React.SFC<{}> = props => <StyledSmall {...props} />;
