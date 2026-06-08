import { CheckIcon, RemoveIcon } from '@bigcommerce/big-design-icons';
import React, {
  cloneElement,
  ComponentPropsWithoutRef,
  forwardRef,
  isValidElement,
  Ref,
  useId,
  useMemo,
} from 'react';

import { typedMemo, warning } from '../../utils';
import { Badge, BadgeProps } from '../Badge';
import { Box } from '../Box';
import { Collapse, CollapsePanelProps, CollapseProps, CollapseTriggerProps } from '../Collapse';
import { FormControlDescription, FormControlDescriptionLinkProps } from '../Form';

import { CheckboxLabel } from './Label';
import {
  CheckboxContainer,
  CheckboxContentContainer,
  CheckboxImgContainer,
  CheckboxLabelContainer,
  HiddenCheckbox,
  StyledCheckbox,
} from './styled';

interface Props {
  hiddenLabel?: boolean;
  isIndeterminate?: boolean;
  label: React.ReactNode;
  description?: CheckboxDescription | string;
  badge?: BadgeProps;
  collapseOptions?: CheckboxCollapse;
  disableWhenUnchecked?: boolean;
  img?: CheckboxImg;
}

interface CheckboxDescription {
  text: string;
  link?: FormControlDescriptionLinkProps;
}

export interface CheckboxImg {
  src: string;
  alt?: string;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export type CheckboxProps = Props & ComponentPropsWithoutRef<'input'>;

export interface CheckboxCollapse {
  collapse?: CollapseProps;
  trigger: CollapseTriggerProps;
  panel?: CollapsePanelProps;
}

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
  collapseOptions,
  img,
  disableWhenUnchecked,
  badge,
  onClick,
  ...props
}) => {
  const isVerticalCenter = Boolean(collapseOptions || img);

  const uniqueCheckboxId = useId();
  const labelId = useId();
  const id = props.id ? props.id : uniqueCheckboxId;

  const renderedLabel = useMemo(() => {
    if (!label) {
      return null;
    }

    if (typeof label === 'string') {
      return (
        <CheckboxLabel
          aria-hidden={disabled}
          disabled={disabled}
          hidden={hiddenLabel}
          htmlFor={id}
          id={labelId}
        >
          {label}
          {badge ? <Badge marginLeft="xSmall" {...badge} /> : null}
        </CheckboxLabel>
      );
    }

    if (isValidElement<ComponentPropsWithoutRef<'label'>>(label) && label.type === CheckboxLabel) {
      return cloneElement(label, {
        hidden: hiddenLabel,
        htmlFor: id,
        id: labelId,
      });
    }

    warning('label must be either a string or a CheckboxLabel component.');
  }, [badge, disabled, hiddenLabel, id, label, labelId]);

  const renderedDescription = useMemo(() => {
    if (!description) {
      return null;
    }

    const link = typeof description === 'object' ? description.link : undefined;
    const text = typeof description === 'object' ? description.text : description;

    return <FormControlDescription link={link}>{text}</FormControlDescription>;
  }, [description]);

  const checkboxRow = (
    <CheckboxContainer
      className={className}
      isVerticalCenter={isVerticalCenter}
      onClick={onClick}
      style={style}
    >
      <HiddenCheckbox
        checked={checked}
        disabled={disabled}
        id={id}
        type="checkbox"
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
              // @ts-expect-error TODO look into useImperativeHandle
              forwardedRef.current = checkbox;
            }
          }
        }}
      />

      <StyledCheckbox
        aria-hidden={true}
        checked={checked}
        disabled={disabled}
        htmlFor={id}
        isIndeterminate={isIndeterminate}
      >
        {!checked && isIndeterminate ? <RemoveIcon /> : <CheckIcon />}
      </StyledCheckbox>
      <CheckboxContentContainer
        hasContent={Boolean(label || description || img || collapseOptions)}
        isVerticalCenter={isVerticalCenter}
      >
        <CheckboxLabelContainer>
          {img && <CheckboxImgContainer alt={img.alt ?? ''} src={img.src} />}
          <Box>
            {renderedLabel}
            {renderedDescription}
          </Box>
        </CheckboxLabelContainer>
        {collapseOptions && <Collapse.Trigger marginVertical="none" {...collapseOptions.trigger} />}
      </CheckboxContentContainer>
    </CheckboxContainer>
  );

  if (!collapseOptions) {
    return checkboxRow;
  }

  return (
    <Collapse
      {...collapseOptions.collapse}
      disabled={disableWhenUnchecked ? !checked : collapseOptions.collapse?.disabled}
    >
      <Box>
        {checkboxRow}
        <Collapse.Panel backgroundColor="secondary20" padding="medium" {...collapseOptions.panel} />
      </Box>
    </Collapse>
  );
};

export const Checkbox = typedMemo(
  forwardRef<HTMLInputElement, CheckboxProps>(({ className, style, ...props }, ref) => (
    <RawCheckbox {...props} forwardedRef={ref} />
  )),
);
