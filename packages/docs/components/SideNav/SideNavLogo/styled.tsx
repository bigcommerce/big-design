import styled from 'styled-components';

export const StyledLogo = styled.div`
  cursor: pointer;

  img {
    margin: 0 auto;
    max-width: 100%;
  }

  p {
    display: none;
    text-align: right;
    margin-right: ${({ theme }) => theme.spacing.medium};

    ${({ theme }) => theme.breakpoints.tablet} {
      display: block;
    }
  }
`;
