import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withMargins } from '../../helpers';
import type { TransientMarginProps } from '../../helpers/margins/margins';
import { StyledFileUploaderWrapper } from '../FileUploader/styled';
import { StyledInputWrapper } from '../Input/styled';
import { StyledTextareaWrapper } from '../Textarea/styled';

interface StyledFormProps extends TransientMarginProps {
  $fullWidth?: boolean;
}

export const StyledForm = styled.form<StyledFormProps>`
  ${withMargins()}

  ${({ theme }) => theme.breakpoints.tablet} {
    ${StyledInputWrapper},
    ${StyledTextareaWrapper},
    ${StyledFileUploaderWrapper} {
      max-width: ${({ $fullWidth, theme }) => ($fullWidth ? '100%' : theme.helpers.remCalc(416))};
    }
  }
`;

StyledForm.defaultProps = { theme: defaultTheme };
