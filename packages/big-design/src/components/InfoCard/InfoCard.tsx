import React from 'react';

import { Badge, BadgeProps } from '../Badge';
import { Box } from '../Box';
import { Small, StyleableText } from '../Typography/Typography';

import { InfoCardImgContainer, InfoCardTitleContainer } from './styled';

export interface InfoCardProps {
  title: string;
  description?: string;
  badge?: BadgeProps;
  img?: {
    src: string;
    alt?: string;
  };
}

export const InfoCard: React.FC<InfoCardProps> = ({ img, title, badge, description }) => (
  <InfoCardTitleContainer>
    {img && <InfoCardImgContainer alt={img.alt ?? ''} src={img.src} />}
    <Box>
      <StyleableText margin="none">
        {title}
        {badge ? <Badge marginLeft="xSmall" {...badge} /> : null}
      </StyleableText>
      {description ? <Small>{description}</Small> : null}
    </Box>
  </InfoCardTitleContainer>
);
