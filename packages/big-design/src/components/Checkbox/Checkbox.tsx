import { CheckIcon, RemoveIcon } from '@bigcommerce/big-design-icons';
import React, {
  cloneElement,
  ComponentPropsWithoutRef,
  forwardRef,
  isValidElement,
  Ref,
  useId,
  useMemo,
  useState,
} from 'react';

import { typedMemo, warning } from '../../utils';
import { Badge, BadgeProps } from '../Badge';
import { Box } from '../Box';
import { Collapse } from '../Collapse';
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
  img?: CheckboxImg;
}

interface CheckboxDescription {
  text: string;
  link?: FormControlDescriptionLinkProps;
}

interface CheckboxImg {
  src: string;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export type CheckboxProps = Props & ComponentPropsWithoutRef<'input'>;

interface CheckboxCollapse {
  children: React.ReactNode;
  collapsedTitle?: string;
  expandedTitle?: string;
  disableWhenUnchecked?: boolean;
}

const DEFAULT_COLLAPSED_TITLE = 'Show more';
const DEFAULT_EXPANDED_TITLE = 'Show less';

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
  badge,
  onClick,
  ...props
}) => {
  const collapsedTitle = collapseOptions?.collapsedTitle ?? DEFAULT_COLLAPSED_TITLE;
  const expandedTitle = collapseOptions?.expandedTitle ?? DEFAULT_EXPANDED_TITLE;

  const [currentCollapseTitle, setCurrentCollapseTitle] = useState(collapsedTitle);
  const [panelRef, setPanelRef] = useState<HTMLDivElement | null>(null);

  const handleCollapseChange = (isOpen: boolean) =>
    setCurrentCollapseTitle(isOpen ? expandedTitle : collapsedTitle);

  const isVerticalCenterCheckboxContainer = collapseOptions?.children || img?.src;

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

  return (
    <Box>
      <CheckboxContainer
        className={className}
        isVerticalCenter={Boolean(isVerticalCenterCheckboxContainer)}
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
          hasContent={Boolean(label) || Boolean(description)}
          isVerticalCenter={Boolean(isVerticalCenterCheckboxContainer)}
        >
          <CheckboxLabelContainer>
            {img && <CheckboxImgContainer src={img.src} />}
            <Box>
              {renderedLabel}
              {renderedDescription}
            </Box>
          </CheckboxLabelContainer>
          {collapseOptions && (
            <Collapse
              disabled={collapseOptions.disableWhenUnchecked ? !checked : undefined}
              marginVertical="none"
              onCollapseChange={handleCollapseChange}
              panelProps={{
                padding: 'medium',
                backgroundColor: 'secondary20',
              }}
              portalTarget={panelRef}
              title={currentCollapseTitle}
            >
              {collapseOptions.children}
            </Collapse>
          )}
        </CheckboxContentContainer>
      </CheckboxContainer>
      {collapseOptions ? <Box ref={setPanelRef} /> : null}
    </Box>
  );
};

export const Checkbox = typedMemo(
  forwardRef<HTMLInputElement, CheckboxProps>(({ className, style, ...props }, ref) => (
    <RawCheckbox {...props} forwardedRef={ref} />
  )),
);
