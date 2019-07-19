import React from 'react';

import { StyledTable, StyledTableBody, StyledTableFooter, StyledTableHead } from './styled';
import { Footer } from './Footer';
import { Header } from './Header';
import { Prop } from './Prop';

export class PropTable extends React.PureComponent {
  static Prop = Prop;
  private static Header = Header;
  private static Footer = Footer;

  render() {
    return (
      <StyledTable>
        <StyledTableHead>
          <PropTable.Header />
        </StyledTableHead>
        <StyledTableBody>{this.props.children}</StyledTableBody>
        <StyledTableFooter>
          <PropTable.Footer />
        </StyledTableFooter>
      </StyledTable>
    );
  }
}
