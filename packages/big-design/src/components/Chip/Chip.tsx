import { CloseIcon } from '@bigcommerce/big-design-icons';
import React, { memo } from 'react';

import { StyledChip } from './styled';

export interface ChipProps {
  id: number;
  label: string;
  displayCloseIcon: boolean;
  onRemove?(id: number, event: React.SyntheticEvent<SVGSVGElement, MouseEvent>): void;
}

export const Chip: React.FC<ChipProps> = memo(({ id, label, displayCloseIcon, onRemove }) => {
  const callRemove: (event: React.SyntheticEvent<SVGSVGElement, MouseEvent>) => void = event => {
    return onRemove && onRemove(id, event);
  };

  return (
    <StyledChip>
      {label}
      {displayCloseIcon && <CloseIcon size="medium" onClick={callRemove} />}
    </StyledChip>
  );
});
