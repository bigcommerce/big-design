import { css } from 'styled-components';

import { H4Styles } from '../../Text/styles';

export const LabelStyles = css`
  ${H4Styles};

  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing.xxSmall};
`;
