import { Flex, FlexItem } from '@bigcommerce/big-design';
import React from 'react';

import { ColorDetails } from './availableColors';
import ColorCard from './ColorCard';

interface ColorCardsProps {
  colorCards: ColorDetails[];
}

export const ColorCards: React.FC<ColorCardsProps> = ({ colorCards }) => (
  <Flex flexWrap="wrap">
    {colorCards.map((colorCard) => {
      return (
        <FlexItem key={colorCard.name} margin="xxSmall">
          <ColorCard colorCard={colorCard} />
        </FlexItem>
      );
    })}
  </Flex>
);

export default ColorCards;
