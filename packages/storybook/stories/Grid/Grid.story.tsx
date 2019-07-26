import { Grid } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

const template = `
  "head head" 80px
  "nav  main" 200px
  "foot  foot" 50px
  / 120px 1fr;
`;

storiesOf('Grid', module)
  .add('Overview', () => (
    <Grid template={template} style={{ height: '100%' }}>
      <Grid.Item area="head" backgroundColor="primary30">
        Header
      </Grid.Item>
      <Grid.Item area="nav" backgroundColor="secondary40">
        Sidebar
      </Grid.Item>
      <Grid.Item area="main" backgroundColor="success30">
        Content
      </Grid.Item>
      <Grid.Item area="foot" backgroundColor="danger30">
        Footer
      </Grid.Item>
    </Grid>
  ))
  .add('3 column', () => (
    <Grid columns="repeat(3, 1fr)" style={{ height: '100%' }}>
      <Grid.Item backgroundColor="danger30">
        Reprehenderit ullamco et elit eu duis non reprehenderit eiusmod pariatur ea deserunt irure. Reprehenderit et
        incididunt sit aute sint proident eu eiusmod pariatur Lorem nulla labore irure nisi. Adipisicing do duis
        occaecat ipsum dolor ea. Qui consectetur sint eu nulla duis et commodo anim commodo. Ullamco consectetur elit
        ullamco aliquip do id consectetur anim laborum.
      </Grid.Item>

      <Grid.Item backgroundColor="primary30">
        In sit dolore culpa reprehenderit tempor laborum. Sit anim voluptate pariatur irure amet mollit. Est mollit ad
        pariatur esse eu reprehenderit ut veniam. Aliquip anim mollit aliquip quis officia minim esse laboris proident
        fugiat cillum. Eiusmod culpa eu ea eiusmod nostrud.
      </Grid.Item>

      <Grid.Item backgroundColor="success30">
        Ipsum adipisicing pariatur magna quis incididunt amet pariatur. Aliqua voluptate consequat ut elit ea dolore
        officia reprehenderit exercitation dolore eiusmod cupidatat quis. Ullamco ipsum do deserunt sunt ad deserunt ut.
        Elit non velit dolore ad est eu.
      </Grid.Item>
    </Grid>
  ));
