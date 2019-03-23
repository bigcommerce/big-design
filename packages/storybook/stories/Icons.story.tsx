import { Box, CheckIcon, DropdownIcon, ErrorIcon, Grid, LoadingIcon, PlusIcon, Text } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

storiesOf('Icons', module).add('Overview', () => (
  <Box margin="medium">
    <Text>Icons, pass a title prop for accessibility</Text>

    <Grid columns="repeat(2, min-content)">
      <CheckIcon />
      <Text margin="none">Check</Text>

      <DropdownIcon />
      <Text margin="none">Dropdown</Text>

      <ErrorIcon />
      <Text margin="none">Error</Text>

      <LoadingIcon />
      <Text margin="none">Loading</Text>

      <PlusIcon />
      <Text margin="none">Plus</Text>
    </Grid>
  </Box>
));
