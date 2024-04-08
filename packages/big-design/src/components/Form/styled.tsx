import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withMargins } from '../../helpers';
import { StyledFileUploaderWrapper } from '../FileUploader/styled';
import { StyledInputWrapper } from '../Input/styled';
import { StyledTextareaWrapper } from '../Textarea/styled';

import { FormProps } from './Form';

export const StyledForm = styled.form<FormProps>`
  ${withMargins()}

  ${({ theme }) => theme.breakpoints.tablet} {
    ${StyledInputWrapper},
    ${StyledTextareaWrapper},
    ${StyledFileUploaderWrapper} {
      max-width: ${({ fullWidth, theme }) => (fullWidth ? '100%' : theme.helpers.remCalc(416))};
    }
  }
`;

StyledForm.defaultProps = { theme: defaultTheme };
