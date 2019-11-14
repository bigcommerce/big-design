import { CloseIcon } from '@bigcommerce/big-design-icons';
import { ThemeInterface } from '@bigcommerce/big-design-theme';
import React, { memo } from 'react';

import { MarginProps } from '../../mixins';
import { Text } from '../Typography';

import { StyledChip, StyledCloseButton } from './styled';

export interface ChipProps extends MarginProps {
  theme?: ThemeInterface;
  label: string;
  onDelete?(): void;
}

export const Chip: React.FC<ChipProps> = memo(({ children, label, onDelete, theme, ...rest }) => {
  const ariaLabel = label ? { 'aria-label': `Remove ${label}` } : {};

  const handleOnDelete = (event: React.SyntheticEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (typeof onDelete === 'function') {
      onDelete();
    }
  };

  const renderDeleteButton = () =>
    onDelete && (
      <StyledCloseButton
        {...ariaLabel}
        variant="subtle"
        onClick={handleOnDelete}
        iconOnly={<CloseIcon size="medium" title="Delete" theme={theme} />}
        theme={theme}
      ></StyledCloseButton>
    );

  return (
    <StyledChip
      backgroundColor="secondary30"
      paddingLeft="xSmall"
      paddingRight="xxSmall"
      margin="xxSmall"
      borderRadius="normal"
      theme={theme}
      {...rest}
    >
      <Text margin="none" marginRight="xxSmall" theme={theme}>
        {label}
      </Text>

      {renderDeleteButton()}
    </StyledChip>
  );
});

Chip.displayName = 'Chip';
