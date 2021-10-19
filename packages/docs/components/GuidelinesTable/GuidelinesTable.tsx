import { Box, Flex, FlexItem, StatefulTable } from '@bigcommerce/big-design';
import { CheckCircleIcon, ErrorIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { GuidelinesTableProps } from './types';

export const GuidelinesTable: React.FC<GuidelinesTableProps> = ({ recommended, discouraged }) => {
  return (
    <>
      <StatefulTable
        columns={[{ header: 'Do', hash: 'do', render: ({ recommend }) => recommend }]}
        items={recommended.map((rule) => ({
          recommend: (
            <Flex alignItems="center">
              <FlexItem flexGrow={0} marginRight="large">
                <CheckCircleIcon color="success" />
              </FlexItem>
              <FlexItem>{rule}</FlexItem>
            </Flex>
          ),
        }))}
      />

      <Box marginTop="xLarge">
        <StatefulTable
          columns={[{ header: `Don't`, hash: 'dont', render: ({ discourage }) => discourage }]}
          items={discouraged.map((rule) => ({
            discourage: (
              <Flex alignItems="center">
                <FlexItem flexGrow={0} marginRight="large">
                  <ErrorIcon color="danger" />
                </FlexItem>
                <FlexItem>{rule}</FlexItem>
              </Flex>
            ),
          }))}
        />
      </Box>
    </>
  );
};
