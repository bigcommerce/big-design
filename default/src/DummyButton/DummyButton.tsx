import styled, { css } from 'styled-components';

interface Props {
  variant: 'primary' | 'secondary';
}

export const DummyButton = styled('button')<Props>`
  color: white;

  ${props =>
    props.variant === 'primary' &&
    css`
      background-color: blue;
    `}

  ${props =>
    props.variant === 'secondary' &&
    css`
      background-color: red;
      border-radius: 10px;
    `}
`;
