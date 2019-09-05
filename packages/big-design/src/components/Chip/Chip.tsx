import { CloseIcon } from '@bigcommerce/big-design-icons';
import React, { memo } from 'react';

import { Text } from '../Typography';

import { StyledChip, StyledCloseButton } from './styled';

export interface ChipProps {
  onDelete?(): void;
}

export const Chip: React.FC<ChipProps> = memo(({ children, onDelete }) => {
  const label = typeof children === 'string' ? children : null;

  const handleOnDelete = (event: React.SyntheticEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (typeof onDelete === 'function') {
      onDelete();
    }
  };

  const renderDeleteButton = () =>
    onDelete && (
      <StyledCloseButton
        variant="subtle"
        onClick={handleOnDelete}
        iconOnly={<CloseIcon size="medium" title="Delete" />}
      ></StyledCloseButton>
    );

  return (
    <StyledChip
      backgroundColor="secondary30"
      paddingLeft="xSmall"
      paddingRight="xxSmall"
      margin="xxSmall"
      borderRadius="normal"
    >
      <Text margin="none" marginRight="xxSmall">
        {label}
      </Text>

      {renderDeleteButton()}
    </StyledChip>
  );
});
