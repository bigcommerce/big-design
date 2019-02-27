import { Flex } from '@bigcommerce/plab';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

const OrangeBox = styled.div`
  background-color: orange;
  height: 50px;
  margin-top: 10px;
  width: 50px;
`;

storiesOf('Flex', module).add('Overview', () => (
  <div>
    <Flex justifyContent="space-around">
      <OrangeBox />
      <OrangeBox />
      <OrangeBox />
      <OrangeBox />
    </Flex>
    <hr />
    <Flex flexDirection="column">
      <OrangeBox />
      <OrangeBox />
      <OrangeBox />
      <OrangeBox />
    </Flex>
  </div>
));
