import React, {
  cloneElement,
  ComponentPropsWithoutRef,
  isValidElement,
  MouseEvent,
  useId,
  useMemo,
} from 'react';

import { typedMemo, warning } from '../../utils';
import { Box } from '../Box';
import { FormControlLabel } from '../Form';

import { StyledButton } from './styled';

type RequireOneOf<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

interface ToggleItem<T> {
  value: T;
  label?: string;
  icon?: React.ReactNode;
}

type ToggleItemType<T> = RequireOneOf<ToggleItem<T>, 'icon' | 'label'>;

export interface ToggleProps<T> {
  id?: string;
  value: T;
  items: Array<ToggleItemType<T>>;
  label?: React.ReactChild;
  labelId?: string;
  disabled?: boolean;
  onChange(id: T): void;
}

export const Toggle = typedMemo(
  <T,>({
    value: activeValue,
    disabled,
    items,
    label,
    labelId,
    onChange,
    ...props
  }: ToggleProps<T>) => {
    const uniqueId = useId();
    const id = props.id ? props.id : uniqueId;

    const handleClick = (itemId: T) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      onChange(itemId);
    };

    const renderedLabel = useMemo(() => {
      if (!label) {
        return null;
      }

      if (typeof label === 'string') {
        return (
          <FormControlLabel htmlFor={id} id={labelId}>
            {label}
          </FormControlLabel>
        );
      }

      if (
        isValidElement<ComponentPropsWithoutRef<'label'>>(label) &&
        label.type === FormControlLabel
      ) {
        return cloneElement(label, {
          id: labelId,
          htmlFor: id,
        });
      }

      warning('label must be either a string or a FormControlLabel component.');
    }, [id, label, labelId]);

    return (
      <div>
        {renderedLabel}
        <Box aria-labelledby={labelId} display="flex" id={id} marginBottom="medium" role="group">
          {items.map(({ value: itemId, label, icon }, idx) => (
            <StyledButton
              aria-checked={itemId === activeValue}
              disabled={disabled}
              isActive={itemId === activeValue}
              isIconType={!!icon}
              key={idx}
              onClick={handleClick(itemId)}
              role="switch"
            >
              {icon || label}
            </StyledButton>
          ))}
        </Box>
      </div>
    );
  },
);
