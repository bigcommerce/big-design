import React, { ComponentPropsWithoutRef } from 'react';

import { Badge, BadgeProps } from '../Badge';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Small, StyleableText } from '../Typography/Typography';

import { InfoCardImgContainer } from './styled';

export interface InfoCardProps {
  title: string;
  description?: string;
  badge?: BadgeProps;
  img?: ComponentPropsWithoutRef<'img'>;
}

export const InfoCard: React.FC<InfoCardProps> = ({ img, title, badge, description }) => {
  const { className: imgClassName, style: imgStyle, ...imgProps } = img ?? {};

  return (
    <Flex alignItems="center">
      {img && <InfoCardImgContainer height={40} width={40} {...imgProps} alt={img.alt ?? ''} />}
      <Box>
        <StyleableText margin="none">
          {title}
          {badge ? <Badge marginLeft="xSmall" {...badge} /> : null}
        </StyleableText>
        {description ? <Small>{description}</Small> : null}
      </Box>
    </Flex>
  );
};
