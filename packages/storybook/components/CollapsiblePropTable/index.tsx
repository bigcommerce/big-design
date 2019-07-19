import { ChevronRight, ExpandMore, Flex, Text } from '@bigcommerce/big-design';
import React from 'react';

import { StyledTable, StyledTableBody, StyledTableFooter, StyledTableHead } from './../PropTable/styled';
import { Footer } from './../PropTable/Footer';
import { Header } from './../PropTable/Header';
import { Prop } from './../PropTable/Prop';
import { StyledFlex } from './styled';

interface CollapsiblePropTableProps {
  title: string;
}

interface CollapsiblePropTableState {
  isCollapsed: boolean;
}

export class CollapsiblePropTable extends React.PureComponent<CollapsiblePropTableProps, CollapsiblePropTableState> {
  static Prop = Prop;
  private static Header = Header;
  private static Footer = Footer;

  readonly state = {
    isCollapsed: true,
  };

  render() {
    return (
      <>
        <StyledFlex alignItems="center" onClick={this.handleOnClick}>
          {this.state.isCollapsed ? <ChevronRight /> : <ExpandMore />}
          <Text>{this.props.title}</Text>
        </StyledFlex>

        <StyledTable style={{ display: this.state.isCollapsed ? 'none' : 'block' }}>
          <StyledTableHead>
            <CollapsiblePropTable.Header />
          </StyledTableHead>
          <StyledTableBody>{this.renderChildren()}</StyledTableBody>
          <StyledTableFooter>
            <CollapsiblePropTable.Footer />
          </StyledTableFooter>
        </StyledTable>
      </>
    );
  }

  private renderChildren() {
    const { children } = this.props;

    return React.Children.map(children, child => {
      if (React.isValidElement(child) && child.type === CollapsiblePropTable.Prop) {
        return child;
      }
    });
  }

  private handleOnClick = () => {
    return this.setState(state => {
      return { isCollapsed: !state.isCollapsed };
    });
  };
}
