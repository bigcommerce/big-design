import { CheckIcon, RemoveIcon } from '@bigcommerce/big-design-icons';
import React, { forwardRef, useMemo, Ref } from 'react';

import { typedMemo, warning } from '../../utils';
import { useUniqueId } from '../../utils/useUniqueId';

import { CheckboxContainer, HiddenCheckbox, StyledCheckbox } from './styled';
import { CheckboxLabel } from './Label';

interface Props {
  hiddenLabel?: boolean;
  isIndeterminate?: boolean;
  label: React.ReactChild;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export type CheckboxProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

const RawCheckbox: React.FC<CheckboxProps & PrivateProps> = ({
  checked,
  className,
  disabled,
  hiddenLabel,
  isIndeterminate,
  label,
  forwardedRef,
  style,
  ...props
}) => {
  const id = props.id ? props.id : useUniqueId('checkbox');
  const labelId = useUniqueId('checkbox_label');

  const renderedLabel = useMemo(() => {
    if (!label) {
      return null;
    }

    if (typeof label === 'string') {
      return (
        <CheckboxLabel disabled={disabled} hidden={hiddenLabel} htmlFor={id} aria-hidden={disabled} id={labelId}>
          {label}
        </CheckboxLabel>
      );
    }

    if (React.isValidElement(label) && label.type === CheckboxLabel) {
      return React.cloneElement(label as React.ReactElement<React.LabelHTMLAttributes<HTMLLabelElement>>, {
        hidden: hiddenLabel,
        htmlFor: id,
        id: labelId,
      });
    }

    warning('label must be either a string or a CheckboxLabel component.');
  }, [disabled, hiddenLabel, id, label, labelId]);

  return (
    <CheckboxContainer className={className} style={style}>
      <HiddenCheckbox
        type="checkbox"
        checked={checked}
        id={id}
        disabled={disabled}
        {...props}
        aria-labelledby={labelId}
        ref={checkbox => {
          if (checkbox && typeof isIndeterminate === 'boolean') {
            checkbox.indeterminate = !checked && isIndeterminate;
          }

          if (forwardedRef) {
            if (typeof forwardedRef === 'function') {
              forwardedRef(checkbox);
            } else {
              // RefObject.current is readonly in DefinitelyTyped
              // but in practice you can still write to it.
              // See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065
              (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = checkbox;
            }
          }
        }}
      />

      <StyledCheckbox
        disabled={disabled}
        isIndeterminate={isIndeterminate}
        checked={checked}
        htmlFor={id}
        aria-hidden={true}
      >
        {!checked && isIndeterminate ? <RemoveIcon /> : <CheckIcon />}
      </StyledCheckbox>
      {renderedLabel}
    </CheckboxContainer>
  );
};

export const Checkbox = typedMemo(
  forwardRef<HTMLInputElement, CheckboxProps>(({ className, style, ...props }, ref) => (
    <RawCheckbox {...props} forwardedRef={ref} />
  )),
);
