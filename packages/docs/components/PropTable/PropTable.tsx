import { Table, TableFigure } from '@bigcommerce/big-design';
import React from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
import { Prop } from './Prop';

export class PropTable extends React.PureComponent {
  static Prop = Prop;
  private static Header = Header;
  private static Footer = Footer;

  render() {
    return (
      <TableFigure>
        <Table>
          <Table.Actions>Test</Table.Actions>
          <Table.Head>
            <PropTable.Header />
          </Table.Head>
          <Table.Body>{this.renderChildren()}</Table.Body>
          <Table.Footer>
            <PropTable.Footer />
          </Table.Footer>
        </Table>
      </TableFigure>
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
}
