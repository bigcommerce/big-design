import React from 'react';

import { Flex } from '../Flex';
import { FlexItem } from '../Flex/Item';
import { Grid } from '../Grid';
import { Small } from '../Typography';
import { Tooltip } from '../Tooltip';

export interface OverflowIndicatorProps {
  items: Array<string>;
  maxLength?: number;
  delimiter?: string;
}

export const OverflowIndicator: React.FC<OverflowIndicatorProps> = ({ items, maxLength = 25, delimiter = ', ' }) => {
  let truncatedResponse = "";
  let extraItemCount = 0;

  items.forEach((item: string, index: number) => {
    const concatenatedString = truncatedResponse + (index > 0 ? delimiter : "") + item;

    if (concatenatedString.length > maxLength) {
      if (index === 0) {
        truncatedResponse = item.substring(0, maxLength).trim() + "...";
      }
        
      extraItemCount++;
    } else {
      truncatedResponse = concatenatedString;
    }
  });

  if (extraItemCount > 0) {
    return (
      <Flex flexGap="1rem" alignItems="center">
        <FlexItem>{truncatedResponse}</FlexItem>
        <FlexItem>
          <Tooltip
            placement="right"
            trigger={
              <Grid
                backgroundColor="primary"
                borderRadius="circle"
                gridColumns="24px"
                gridRows="24px"
              >
                <Flex
                  alignItems="center"
                  alignContent="stretch"
                  justifyContent="center"
                >
                  <Small color="white">+{extraItemCount}</Small>
                </Flex>
              </Grid>
            }
          >
            {items.map((item, index) => {
              return (
                <Small key={index} color="white" margin="none">
                  {item}
                </Small>
              );
            })}
          </Tooltip>
        </FlexItem>
      </Flex>
    );
  }

  return truncatedResponse;
};
