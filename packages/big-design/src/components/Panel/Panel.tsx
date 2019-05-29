import React from 'react';

import { MarginProps } from '../../mixins';

import { StyledPanel } from './styled';

export type PanelProps = React.HTMLAttributes<HTMLElement> & MarginProps;

export const RawPanel: React.FC<PanelProps> = props => (
  <StyledPanel
    marginBottom="xxLarge"
    backgroundColor="white"
    padding={{ mobile: 'medium', tablet: 'xxLarge' }}
    {...props}
  />
);

export const Panel: React.FC<PanelProps> = ({ className, style, ...props }) => <RawPanel {...props} />;
