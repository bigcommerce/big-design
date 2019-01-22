import React from 'react';
import styled from 'styled-components';

import { defaultTheme } from '../../theme';

import { FormRowStyles } from './styles';

export interface FormRowProps {
  children?: React.ReactNode;
}

export const FormRow = styled.div<FormRowProps>`
  ${({ theme }) => theme.FormRow || FormRowStyles};
`;

FormRow.defaultProps = { theme: defaultTheme };
