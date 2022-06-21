import { CloseIcon } from '@bigcommerce/big-design-icons';
import React, { memo } from 'react';

import { MarginProps } from '../../mixins';
import { Text } from '../Typography';

import { StyledChip, StyledCloseButton } from './styled';

export interface ChipProps extends MarginProps {
  children?: React.ReactNode;
  label: string;
  onDelete?(): void;
}

export const Chip: React.FC<ChipProps> = memo(({ children, label, onDelete, ...rest }) => {
  const ariaLabel = label ? { 'aria-label': `Remove ${label}` } : {};

  const renderDeleteButton = () =>
    onDelete && (
      <StyledCloseButton
        {...ariaLabel}
        iconOnly={<CloseIcon size="medium" title="Delete" />}
        onClick={onDelete}
        type="button"
        variant="subtle"
      />
    );

  return (
    <StyledChip
      margin="xxSmall"
      {...rest}
      backgroundColor="secondary30"
      borderRadius="normal"
      paddingLeft="xSmall"
      paddingRight="xxSmall"
    >
      <Text margin="none" marginRight="xxSmall">
        {label}
      </Text>

      {renderDeleteButton()}
    </StyledChip>
  );
});

Chip.displayName = 'Chip';
