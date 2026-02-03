import { CloseIcon } from '@bigcommerce/big-design-icons';
import React, { memo } from 'react';

import { MarginProps } from '../../helpers';
import { Text } from '../Typography';

import { StyledChip, StyledChipIcon, StyledCloseButton } from './styled';

export interface ChipProps extends MarginProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  label: string;
  onDelete?(): void;
}

export const Chip: React.FC<ChipProps> = memo(({ children, icon, label, onDelete, ...rest }) => {
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
      {icon ? <StyledChipIcon>{icon}</StyledChipIcon> : null}
      <Text margin="none" marginRight="xxSmall">
        {label}
      </Text>

      {renderDeleteButton()}
    </StyledChip>
  );
});

Chip.displayName = 'Chip';
