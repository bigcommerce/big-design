import React from 'react';
import styled from 'styled-components';

import { defaultTheme } from '../../../theme';

import { FormRowStyles } from './styles';

export interface FormRowProps {
  children?: React.ReactNode;
}

export const Row = styled.div<FormRowProps>`
  ${FormRowStyles};
`;

Row.defaultProps = { theme: defaultTheme };
