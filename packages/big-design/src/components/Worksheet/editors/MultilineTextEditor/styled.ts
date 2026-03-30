import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const ClampedText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  line-height: ${({ theme }) => theme.lineHeight.small};
  color: ${({ theme }) => theme.colors.secondary70};
  word-break: break-word;
  cursor: pointer;

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol {
    margin: 0;
    padding: 0;
  }

  ul,
  ol {
    list-style-position: inside;
  }
`;

ClampedText.defaultProps = { theme: defaultTheme };
