import { Flex, Select } from '@bigcommerce/big-design';
import { number, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Placement } from 'popper.js';
import React from 'react';

const placement: Placement[] = [
  'auto',
  'auto-end',
  'auto-start',
  'bottom',
  'bottom-end',
  'bottom-start',
  'left',
  'left-end',
  'left-start',
  'right',
  'right-end',
  'right-start',
  'top',
  'top-end',
  'top-start',
];

interface State {
  value: string;
}

class Story extends React.Component<{}, State> {
  state = {
    value: '',
  };

  render() {
    return (
      <Flex justifyContent="space-around">
        <Select
          label="Countries"
          maxHeight={number('maxHeight', 300)}
          onActionClick={inputText => inputText}
          onItemChange={(selectedValue: string) => this.setState({ value: selectedValue })}
          placeholder={'Choose country'}
          placement={select('placement', placement, 'bottom-start')}
          value={this.state.value}
          error={this.state.value ? undefined : 'You must choose a country'}
        >
          <Select.Option value="us">United States</Select.Option>
          <Select.Option value="mx">Mexico</Select.Option>
          <Select.Option value="ca">Canada</Select.Option>
          <Select.Option value="en">England</Select.Option>
          <Select.Option value="fr">France</Select.Option>
          <Select.Option value="gr">Germany</Select.Option>
          <Select.Option value="ar">Argentina</Select.Option>
          <Select.Option value="ch">Chile</Select.Option>
          <Select.Option value="bo">Bolivia</Select.Option>
          <Select.Option value="jp">Japan</Select.Option>
          <Select.Option value="cn">China</Select.Option>
          <Select.Option value="sk">South Korea</Select.Option>
          <Select.Option value="au">Australia</Select.Option>
          <Select.Option value="ug">Uganda</Select.Option>
          <Select.Option value="ru" disabled>
            Russia
          </Select.Option>
          <Select.Action>Action</Select.Action>
        </Select>
      </Flex>
    );
  }
}

storiesOf('Select', module).add('Overview', () => <Story />);
