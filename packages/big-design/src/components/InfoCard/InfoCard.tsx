import React, { type ComponentPropsWithoutRef, useMemo } from 'react';

import { Badge, type BadgeProps } from '../Badge';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { FormControlDescription, type FormControlDescriptionLinkProps } from '../Form';
import { StyleableText } from '../Typography/Typography';

import { InfoCardImgContainer } from './styled';

interface InfoCardDescription {
  text: string;
  link?: FormControlDescriptionLinkProps;
}

export interface InfoCardProps {
  title: string;
  description?: InfoCardDescription | string;
  badge?: BadgeProps;
  img?: ComponentPropsWithoutRef<'img'>;
}

export const InfoCard: React.FC<InfoCardProps> = ({ img, title, badge, description }) => {
  const { className: imgClassName, style: imgStyle, ...imgProps } = img ?? {};

  const renderedDescription = useMemo(() => {
    if (!description) {
      return null;
    }

    const link = typeof description === 'object' ? description.link : undefined;
    const text = typeof description === 'object' ? description.text : description;

    return <FormControlDescription link={link}>{text}</FormControlDescription>;
  }, [description]);

  return (
    <Flex alignItems="center">
      {img && <InfoCardImgContainer height={40} width={40} {...imgProps} alt={img.alt ?? ''} />}
      <Box>
        <StyleableText $margin="none">
          {title}
          {badge ? <Badge marginLeft="xSmall" {...badge} /> : null}
        </StyleableText>
        {renderedDescription}
      </Box>
    </Flex>
  );
};
