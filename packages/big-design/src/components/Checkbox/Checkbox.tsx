import { CheckIcon, RemoveIcon } from '@bigcommerce/big-design-icons';
import { ThemeInterface } from '@bigcommerce/big-design-theme';
import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { memo, Ref } from 'react';

import { uniqueId } from '../../utils';

import { CheckboxContainer, HiddenCheckbox, StyledCheckbox, StyledLabel } from './styled';

interface Props {
  hiddenLabel?: boolean;
  isIndeterminate?: boolean;
  label?: React.ReactChild;
  theme?: ThemeInterface;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export type CheckboxProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

class RawCheckbox extends React.PureComponent<CheckboxProps & PrivateProps> {
  static Label = memo(StyledLabel);
  private readonly uniqueId = uniqueId('checkBox_');
  private readonly labelUniqueId = uniqueId('checkBox_label_');

  render() {
    const { checked, className, isIndeterminate, label, forwardedRef, style, ...props } = this.props;
    const id = this.getInputId();

    return (
      <CheckboxContainer className={className} style={style} theme={props.theme}>
        <HiddenCheckbox
          type="checkbox"
          checked={checked}
          id={id}
          {...props}
          aria-labelledby={this.labelUniqueId}
          ref={checkbox => {
            if (checkbox && typeof isIndeterminate === 'boolean') {
              checkbox.indeterminate = !checked && isIndeterminate;
            }

            if (forwardedRef) {
              if (typeof forwardedRef === 'function') {
                forwardedRef(checkbox);
              } else {
                // RefObject.current is readonly in DefinitelyTyped but in practice you
                // can still write to it.
                // See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065
                // @ts-ignore
                forwardedRef.current = checkbox;
              }
            }
          }}
        />

        <StyledCheckbox
          isIndeterminate={isIndeterminate}
          checked={checked}
          htmlFor={id}
          aria-hidden={true}
          theme={props.theme}
        >
          {!checked && isIndeterminate ? <RemoveIcon theme={props.theme} /> : <CheckIcon theme={props.theme} />}
        </StyledCheckbox>
        {this.renderLabel()}
      </CheckboxContainer>
    );
  }

  private getInputId() {
    const { id } = this.props;

    return id ? id : this.uniqueId;
  }

  private renderLabel() {
    const htmlFor = this.getInputId();
    const { disabled, hiddenLabel, label, theme } = this.props;

    if (typeof label === 'string') {
      return (
        <StyledLabel
          disabled={disabled}
          hidden={hiddenLabel}
          htmlFor={htmlFor}
          aria-hidden={disabled}
          id={this.labelUniqueId}
          theme={theme}
        >
          {label}
        </StyledLabel>
      );
    }

    if (React.isValidElement(label) && label.type === Checkbox.Label) {
      return React.cloneElement(label as React.ReactElement<React.LabelHTMLAttributes<HTMLLabelElement>>, {
        hidden: hiddenLabel,
        htmlFor,
        id: this.labelUniqueId,
      });
    }

    return null;
  }
}

const CheckboxWithForwardedRef = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, style, ...props }, ref) => <RawCheckbox {...props} forwardedRef={ref} />,
);

export const Checkbox = hoistNonReactStatics(CheckboxWithForwardedRef, RawCheckbox);

export const StyleableCheckbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => (
  <RawCheckbox {...props} forwardedRef={ref} />
));

Checkbox.displayName = 'Checkbox';
StyleableCheckbox.displayName = 'StyleableCheckbox';
