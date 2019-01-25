import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Panel } from '../Panel';

import { Tabs } from './Tabs';

storiesOf('Tabs', module).add('Overview', () => (
  <div style={{ padding: 50 }}>
    <Panel>
      <Tabs activeTab={select('Active Tab', ['tab1', 'tab2', 'tab3'], 'tab1')} onTabClick={action('onTabClick')}>
        <Tabs.Tab id="tab1">Example 1</Tabs.Tab>
        <Tabs.Tab id="tab2">Example 2</Tabs.Tab>
        <Tabs.Tab id="tab3">Example 3</Tabs.Tab>
      </Tabs>
    </Panel>
  </div>
));
