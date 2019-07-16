import React from 'react';

import { StyledTable, StyledTableBody, StyledTableHead } from './styled';
import { Header } from './Header';
import { Prop } from './Prop';

export const RequiredContext = React.createContext(false);

export class PropTable extends React.PureComponent {
  static Prop = Prop;
  private static Header = Header;

  private hasRequired = false;

  render() {
    this.setRequiredContext();

    return (
      <RequiredContext.Provider value={this.hasRequired}>
        <StyledTable>
          <StyledTableHead>
            <PropTable.Header />
          </StyledTableHead>
          <StyledTableBody>{this.renderChildren()}</StyledTableBody>
        </StyledTable>
      </RequiredContext.Provider>
    );
  }

  private renderChildren() {
    const { children } = this.props;

    return React.Children.map(children, child => {
      if (React.isValidElement(child) && child.type === PropTable.Prop) {
        return child;
      }
    });
  }

  private setRequiredContext() {
    const { children } = this.props;

    React.Children.map(children, child => {
      if (React.isValidElement(child) && child.type === PropTable.Prop && child.props.required) {
        return (this.hasRequired = true);
      }
    });
  }
}
