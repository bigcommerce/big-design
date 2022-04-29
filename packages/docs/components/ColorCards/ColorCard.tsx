import { Flex, Link, Small, Text } from '@bigcommerce/big-design';
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { ColorDetails } from './availableColors';

const StyledColor = styled(Flex)`
  height: ${({ theme }) => theme.helpers.remCalc(160)};
  width: ${({ theme }) => theme.helpers.remCalc(184)};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
`;

interface ColorCardProps {
  colorCard: ColorDetails;
}

const ColorCard: React.FC<ColorCardProps> = ({ colorCard }) => {
  const { colors } = useContext(ThemeContext);
  const { description } = colorCard;
  const colorValue = colors[colorCard.name];
  const hasHexColor = colorValue.startsWith('#');
  const hasSecondaryTextColor = colorCard.secondaryTextColor !== undefined;

  const renderContrast = () => {
    if (hasSecondaryTextColor) {
      return (
        <Flex alignItems="flex-end">
          <Text marginRight="xSmall" marginBottom="none" color={colorCard.textColor}>
            {colorCard.contrast}
          </Text>
          <Text marginBottom="none" color={colorCard.secondaryTextColor}>
            {colorCard.contrast}
          </Text>
        </Flex>
      );
    }

    return (
      <Text margin="none" color={colorCard.textColor}>
        {colorCard.contrast}
      </Text>
    );
  };

  return (
    <StyledColor
      backgroundColor={colorCard.name}
      justifyContent={hasHexColor ? 'space-between' : 'baseline'}
      flexDirection="column"
      border="box"
    >
      <Text margin="small" color={colorCard.textColor} bold>
        {getColorLabel(colorCard.name)}
      </Text>

      {description && (
        <Small color={colorCard.textColor} margin="small">
          {description?.text}{' '}
          {description?.href && (
            <Link href={description.href} target="_blank">
              <Small color="inherit">Read more</Small>
            </Link>
          )}
        </Small>
      )}

      {hasHexColor && (
        <Flex margin="small" justifyContent="space-between" flexWrap="wrap">
          <Text margin="none" color={colorCard.textColor}>
            {colorValue}
          </Text>

          {renderContrast()}
        </Flex>
      )}
    </StyledColor>
  );
};

function getColorLabel(color: string) {
  return color.includes('40') ? `${color} / ${color.replace('40', '')}` : color;
}

export default ColorCard;
