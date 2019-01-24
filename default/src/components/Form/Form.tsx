import React from 'react';

import { StyledForm } from './styled';
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
