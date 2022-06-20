import { CheckIcon, RemoveIcon } from '@bigcommerce/big-design-icons';
import React, { cloneElement, forwardRef, isValidElement, Ref, useMemo } from 'react';

import { useUniqueId } from '../../hooks';
import { typedMemo, warning } from '../../utils';
import { FormControlDescription, FormControlDescriptionLinkProps } from '../Form';

import { CheckboxLabel } from './Label';
import { CheckboxContainer, CheckboxLabelContainer, HiddenCheckbox, StyledCheckbox } from './styled';

interface Props {
  hiddenLabel?: boolean;
  isIndeterminate?: boolean;
  label: React.ReactChild;
  description?: CheckboxDescription | string;
}

interface CheckboxDescription {
  text: string;
  link?: FormControlDescriptionLinkProps;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export type CheckboxProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

const RawCheckbox: React.FC<CheckboxProps & PrivateProps> = ({
  checked,
  className,
  description,
  disabled,
  hiddenLabel,
  isIndeterminate,
  label,
  forwardedRef,
  style,
  ...props
}) => {
  const uniqueCheckboxId = useUniqueId('checkbox');
  const id = props.id ? props.id : uniqueCheckboxId;
  const labelId = useUniqueId('checkbox_label');

  // console.log(checked, 'here the checked');
  // console.log(isIndeterminate, 'here is indetermiante');
  // console.log(props.onChange, 'here the on change');
  console.log(checked, 'here the checked');

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

    if (isValidElement(label) && label.type === CheckboxLabel) {
      return cloneElement(label as React.ReactElement<React.LabelHTMLAttributes<HTMLLabelElement>>, {
        hidden: hiddenLabel,
        htmlFor: id,
        id: labelId,
      });
    }

    warning('label must be either a string or a CheckboxLabel component.');
  }, [disabled, hiddenLabel, id, label, labelId]);

  const renderedDescription = useMemo(() => {
    if (!description) {
      return null;
    }

    const link = typeof description === 'object' ? description.link : undefined;
    const text = typeof description === 'object' ? description.text : description;

    return <FormControlDescription link={link}>{text}</FormControlDescription>;
  }, [description]);

  return (
    <CheckboxContainer className={className} style={style}>
      <HiddenCheckbox
        type="checkbox"
        checked={checked}
        id={id}
        disabled={disabled}
        {...props}
        aria-checked={checked}
        aria-labelledby={labelId}
        ref={(checkbox) => {
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
      <CheckboxLabelContainer>
        {renderedLabel}
        {renderedDescription}
      </CheckboxLabelContainer>
    </CheckboxContainer>
  );
};

export const Checkbox = typedMemo(
  forwardRef<HTMLInputElement, CheckboxProps>(({ className, style, ...props }, ref) => (
    <RawCheckbox {...props} forwardedRef={ref} />
  )),
);
