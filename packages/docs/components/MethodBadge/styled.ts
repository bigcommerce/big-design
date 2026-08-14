import { MarginProps, withMargins } from '@bigcommerce/big-design';
import styled from 'styled-components';

import { MethodBadgeProps } from './MethodBadge';

interface StyledMethodBadgeProps extends Omit<MethodBadgeProps, 'label' | keyof MarginProps> {
  $margin?: MarginProps['margin'];
  $marginTop?: MarginProps['marginTop'];
  $marginRight?: MarginProps['marginRight'];
  $marginBottom?: MarginProps['marginBottom'];
  $marginLeft?: MarginProps['marginLeft'];
  $marginVertical?: MarginProps['marginVertical'];
  $marginHorizontal?: MarginProps['marginHorizontal'];
}

export const StyledMethodBadge = styled.span<StyledMethodBadgeProps>`
  ${withMargins()};

  background-color: ${({ theme }) => theme.colors.secondary70};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  color: ${({ theme }) => theme.colors.white};
  display: inline-block;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.lineHeight.medium};
  text-transform: uppercase;
  padding: 0 ${({ theme }) => theme.spacing.xSmall};
`;
