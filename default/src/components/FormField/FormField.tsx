import React from 'react';
import styled from 'styled-components';

import { defaultTheme, ThemeInterface } from '../../theme';
import { uniqueId } from '../../utils';

import { FormFieldStyles } from './styles';
import { Description } from './Description';
import { Error } from './Error';
import { Input } from './Input';
import { Label } from './Label';

export interface FormFieldProps {
  error?: string;
  theme?: ThemeInterface;
}

export class FormField extends React.PureComponent<FormFieldProps> {
  static Description = Description;
  static Error = Error;
  static Input = Input;
  static Label = Label;

  private readonly uniqueId = uniqueId('formField_');

  render() {
    const { children, ...rest } = this.props;

    const hasError = this.hasError(children);

    const modifiedChildren = React.Children.map(children, child => {
      return this.augmentChild(child as React.ReactElement<any>, rest, hasError);
    });

    return <StyledFormField>{modifiedChildren}</StyledFormField>;
  }

  private hasError(children: React.ReactNode) {
    const childrenMap = React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return false;
      }

      return child.type === Error;
    });

    return childrenMap.includes(true);
  }

  private augmentChild(child: React.ReactElement<any>, props: FormFieldProps, hasError: boolean) {
    if (!React.isValidElement(child)) {
      return null;
    }

    if (child.type === Input) {
      return React.cloneElement(child, {
        ...props,
        id: child.props.id || this.uniqueId,
        error: hasError,
      });
    }

    if (child.type === Label) {
      return React.cloneElement(child, {
        ...props,
        htmlFor: child.props.htmlFor || this.uniqueId,
      });
    }

    return React.cloneElement(child, { ...props });
  }
}

const StyledFormField = styled.div`
  ${({ theme }) => theme.FormField || FormFieldStyles};
`;

StyledFormField.defaultProps = { theme: defaultTheme };
