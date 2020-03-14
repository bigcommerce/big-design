import React from 'react';

import { StyledToggleButton } from './styled';

export interface ToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
}

export const ToggleButton: React.FC<ToggleButtonProps> = React.memo(({ className, style, ...props }) => {
  const { selected } = props;

  return (
    <StyledToggleButton aria-pressed={selected} selected={selected} {...props}>
      {props.children}
    </StyledToggleButton>
  );
});
