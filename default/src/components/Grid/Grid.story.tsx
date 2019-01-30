import { storiesOf } from '@storybook/react';
import React from 'react';

import { Grid } from './Grid';

const template = `
  "head head" 80px
  "nav  main" 1fr
  "nav  foot" 10%
  / 120px 1fr;
`;

storiesOf('Grid', module).add('Overview', () => (
  <div style={{ height: '100vh' }}>
    <Grid template={template} style={{ height: '100%' }} gap="10px">
      <Grid.Item area="head" style={{ backgroundColor: 'pink' }}>
        Header
      </Grid.Item>
      <Grid.Item area="nav" style={{ backgroundColor: 'lightgreen' }}>
        Sidebar
      </Grid.Item>
      <Grid.Item area="main" style={{ backgroundColor: 'lightblue' }}>
        Content
      </Grid.Item>
      <Grid.Item area="foot" style={{ backgroundColor: 'violet' }}>
        Footer
      </Grid.Item>
    </Grid>
  </div>
));
