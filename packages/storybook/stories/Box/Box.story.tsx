import { Box, Flex, H0, H1, Text } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { CodePreview } from '../../components';

import { BoxPropTable } from './BoxPropTable';

storiesOf('Box', module).add('Overview', () => (
  <>
    <H0>Box</H0>

    <Text>Mostly used as a simple container or as a base to build other components.</Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Box backgroundColor="primary20" border="box" borderRadius="normal" padding="medium">
        Boxed content
      </Box>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <BoxPropTable />

    <H1>Examples</H1>
    <Box>
      <Text>Box also supports multiple elevations, here is an example of how they look like:</Text>
      <CodePreview>
        {/* jsx-to-string:start */}
        <Flex justifyContent="space-around">
          <Box backgroundColor="primary20" padding="xxLarge" elevation="floating">
            Floating
          </Box>
          <Box backgroundColor="primary20" padding="xxLarge" elevation="raised">
            Raised
          </Box>
        </Flex>
        {/* jsx-to-string:end */}
      </CodePreview>
    </Box>

    <Box marginTop="xxLarge">
      <Text>
        Box is extendable, here is an example on how to create an Avatar component extending from Box with a couple of
        extra styles
      </Text>
      <CodePreview>
        {/* jsx-to-string:start */}
        {function Avatar() {
          const StyledBox = styled(Box)(({ theme }) => ({
            height: theme.spacing.large,
            width: theme.spacing.large,
          }));

          return (
            <StyledBox backgroundColor="primary20" border="box" borderRadius="circle" padding="medium">
              BC
            </StyledBox>
          );
        }}
        {/* jsx-to-string:end */}
      </CodePreview>
    </Box>
  </>
));
