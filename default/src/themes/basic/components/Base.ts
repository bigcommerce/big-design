import { css } from 'styled-components';

export default css`
  margin: 0;
  padding: 0;
  border: 0;
  line-height: ${({ theme }) => theme.lineHeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  vertical-align: baseline;
  box-sizing: border-box;
`;
