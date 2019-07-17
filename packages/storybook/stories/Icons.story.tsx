import {
  AssignmentIcon,
  CheckIcon,
  CloseIcon,
  DropdownIcon,
  ErrorIcon,
  Flex,
  Grid,
  InvertColorsIcon,
  LoadingIcon,
  PlusIcon,
  RestoreIcon,
  SuccessIcon,
  Text,
} from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

storiesOf('Icons', module).add('Overview', () => (
  <>
    <Text>Icons, pass a title prop for accessibility</Text>

    <Grid columns="repeat(4, max-content)" gap="2rem">
      <Flex alignItems="center">
        <AssignmentIcon />
        <Text marginLeft="small">Assingment</Text>
      </Flex>

      <Flex alignItems="center">
        <CheckIcon />
        <Text marginLeft="small">Check</Text>
      </Flex>

      <Flex alignItems="center">
        <CloseIcon />
        <Text marginLeft="small">Close</Text>
      </Flex>

      <Flex alignItems="center">
        <DropdownIcon />
        <Text marginLeft="small">Dropdown</Text>
      </Flex>

      <Flex alignItems="center">
        <ErrorIcon />
        <Text marginLeft="small">Error</Text>
      </Flex>

      <Flex alignItems="center">
        <InvertColorsIcon />
        <Text marginLeft="small">Invert Colors</Text>
      </Flex>

      <Flex alignItems="center">
        <LoadingIcon />
        <Text marginLeft="small">Loading</Text>
      </Flex>

      <Flex alignItems="center">
        <PlusIcon />
        <Text marginLeft="small">Plus</Text>
      </Flex>

      <Flex alignItems="center">
        <RestoreIcon />
        <Text marginLeft="small">Restore</Text>
      </Flex>

      <Flex alignItems="center">
        <SuccessIcon />
        <Text marginLeft="small">Success</Text>
      </Flex>
    </Grid>
  </>
));
