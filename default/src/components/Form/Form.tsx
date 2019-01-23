import React from 'react';
import styled from 'styled-components';

import { defaultTheme } from '../../theme';

import { FormStyles } from './styles';
import { Actions } from './Actions';
import { Fieldset } from './Fieldset';
import { Row } from './Row';

export class Form extends React.PureComponent<{}> {
  static Actions = Actions;
  static Fieldset = Fieldset;
  static Row = Row;

  render() {
    return <StyledForm {...this.props} />;
  }
}

const StyledForm = styled.form`
  ${FormStyles};
`;

StyledForm.defaultProps = { theme: defaultTheme };
