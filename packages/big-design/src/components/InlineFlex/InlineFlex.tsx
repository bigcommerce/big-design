import React from 'react';

import { Flex } from './../Flex/Flex';
import { StyledInlineFlex } from './styled';

export class InlineFlex extends Flex {
  render() {
    return <StyledInlineFlex {...this.props} />;
  }
}
