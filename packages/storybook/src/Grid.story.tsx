import { storiesOf } from '@storybook/react';
import React from 'react';
import { Grid } from '@bigcommerce/plab';

const template = `
  "head head" 80px
  "nav  main" 1fr
  "nav  foot" 10%
  / 120px 1fr;
`;

storiesOf('Grid', module)
  .add('Overview', () => (
    <div style={{ height: '100vh' }}>
      <Grid template={template} style={{ height: '100%' }}>
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
  ))
  .add('3 column', () => (
    <Grid columns="repeat(3, 1fr)">
      <Grid.Item style={{ backgroundColor: 'pink' }}>
        Reprehenderit ullamco et elit eu duis non reprehenderit eiusmod pariatur ea deserunt irure. Reprehenderit et
        incididunt sit aute sint proident eu eiusmod pariatur Lorem nulla labore irure nisi. Adipisicing do duis
        occaecat ipsum dolor ea. Qui consectetur sint eu nulla duis et commodo anim commodo. Ullamco consectetur elit
        ullamco aliquip do id consectetur anim laborum.
      </Grid.Item>

      <Grid.Item style={{ backgroundColor: 'lightgreen' }}>
        In sit dolore culpa reprehenderit tempor laborum. Sit anim voluptate pariatur irure amet mollit. Est mollit ad
        pariatur esse eu reprehenderit ut veniam. Aliquip anim mollit aliquip quis officia minim esse laboris proident
        fugiat cillum. Eiusmod culpa eu ea eiusmod nostrud.
      </Grid.Item>

      <Grid.Item style={{ backgroundColor: 'lightblue' }}>
        Ipsum adipisicing pariatur magna quis incididunt amet pariatur. Aliqua voluptate consequat ut elit ea dolore
        officia reprehenderit exercitation dolore eiusmod cupidatat quis. Ullamco ipsum do deserunt sunt ad deserunt ut.
        Elit non velit dolore ad est eu.
      </Grid.Item>
    </Grid>
  ));
