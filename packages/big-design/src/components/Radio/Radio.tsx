import React, { forwardRef, useMemo, Ref } from 'react';

import { useUniqueId } from '../../hooks';
import { typedMemo, warning } from '../../utils';

import { HiddenRadio, RadioContainer, StyledRadio } from './styled';
import { RadioLabel } from './Label';

interface Props {
  label: React.ReactChild;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export type RadioProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

const RawRadio: React.FC<RadioProps & PrivateProps> = ({
  checked,
  className,
  disabled,
  label,
  forwardedRef,
  style,
  ...props
}) => {
  const uniqueRadioId = useUniqueId('radio');
  const id = props.id ? props.id : uniqueRadioId;
  const labelId = useUniqueId('radio_label');

  const renderedLabel = useMemo(() => {
    if (!label) {
      return null;
    }

    if (typeof label === 'string') {
      return (
        <RadioLabel htmlFor={id} id={labelId} disabled={disabled} aria-hidden={disabled}>
          {label}
        </RadioLabel>
      );
    }

    if (React.isValidElement(label) && label.type === RadioLabel) {
      return React.cloneElement(label as React.ReactElement<React.LabelHTMLAttributes<HTMLLabelElement>>, {
        htmlFor: id,
        id: labelId,
      });
    }

    warning('label must be either a string or a RadioLabel component.');
  }, [disabled, id, label, labelId]);

  return (
    <RadioContainer className={className} style={style}>
      <HiddenRadio
        type="radio"
        checked={checked}
        id={id}
        disabled={disabled}
        {...props}
        aria-labelledby={labelId}
        ref={forwardedRef}
      />
      <StyledRadio checked={checked} disabled={disabled} htmlFor={id} aria-hidden={true} />
      {renderedLabel}
    </RadioContainer>
  );
};

export const Radio = typedMemo(
  forwardRef<HTMLInputElement, RadioProps>(({ className, style, ...props }, ref) => (
    <RawRadio {...props} forwardedRef={ref} />
  )),
);
