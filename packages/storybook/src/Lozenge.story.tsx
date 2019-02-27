import { Grid, Lozenge } from '@bigcommerce/plab';
import { storiesOf } from '@storybook/react';
import React from 'react';

storiesOf('Lozenge', module).add('Overview', () => (
  <Grid style={{ margin: 16 }}>
    <Grid.Item>
      <p>Design not finalized, need extra feedback on font-spacing and font-size to adhere to the theme.</p>
    </Grid.Item>
    <Grid.Item>
      <Lozenge>secondary</Lozenge>
    </Grid.Item>
    <Grid.Item>
      <Lozenge variant="primary">primary</Lozenge>
    </Grid.Item>
    <Grid.Item>
      <Lozenge variant="success">success</Lozenge>
    </Grid.Item>
    <Grid.Item>
      <Lozenge variant="warning">warning</Lozenge>
    </Grid.Item>
    <Grid.Item>
      <Lozenge variant="danger">danger</Lozenge>
    </Grid.Item>
  </Grid>
));
