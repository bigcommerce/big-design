import { css } from 'styled-components';

export const FormFieldStyles = css`
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  &:last-child {
    margin: 0;
  }
`;
