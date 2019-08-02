import Link from 'next/link';
import styled from 'styled-components';

const StyledLink = styled.a`
  display: block;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing.xxSmall};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary60};
  }
`;

export const SideNavLink: React.FC<{ href: string; as?: string }> = props => (
  <Link href={props.href} as={props.as}>
    <StyledLink>{props.children}</StyledLink>
  </Link>
);
