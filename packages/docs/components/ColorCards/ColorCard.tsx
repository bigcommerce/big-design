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
          <Text color={colorCard.textColor} marginBottom="none" marginRight="xSmall">
            {colorCard.contrast}
          </Text>
          <Text color={colorCard.secondaryTextColor} marginBottom="none">
            {colorCard.contrast}
          </Text>
        </Flex>
      );
    }

    return (
      <Text color={colorCard.textColor} margin="none">
        {colorCard.contrast}
      </Text>
    );
  };

  return (
    <StyledColor
      backgroundColor={colorCard.name}
      border="box"
      flexDirection="column"
      justifyContent={hasHexColor ? 'space-between' : 'baseline'}
    >
      <Text bold color={colorCard.textColor} margin="small">
        {getColorLabel(colorCard.name)}
      </Text>

      {description && (
        <Small color={colorCard.textColor} margin="small">
          {description.text}{' '}
          {description.href ? (
            <Link href={description.href} target="_blank">
              <Small color="inherit">Read more</Small>
            </Link>
          ) : null}
        </Small>
      )}

      {hasHexColor && (
        <Flex flexWrap="wrap" justifyContent="space-between" margin="small">
          <Text color={colorCard.textColor} margin="none">
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
