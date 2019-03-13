// This code was written by Kent C. Dodds
// Feel free to do whatever you like with it
// but please credit the original author :)
import Downshift, {
  DownshiftProps,
  GetItemPropsOptions,
  GetMenuPropsOptions,
  GetPropsCommonOptions,
  GetToggleButtonPropsOptions,
  PropGetters,
} from 'downshift';
import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { ComponentType, ReactNode } from 'react';
import { FunctionComponent } from 'react';

import { Omit } from '../../../types/shared';
import { DropdownProps, DropdownToggleProps } from '../Dropdown';
import { DropdownItem, DropdownItemProps } from '../Item/Item';

const DownshiftContext = React.createContext({});

interface Downshift<Item> {
  downshift: DownshiftProps<Item> & PropGetters<Item>;
}

interface DownshiftComponentsProps<Item> extends Omit<DownshiftProps<Item>, 'children'> {
  children: React.ReactNode[];
}

interface ItemProps<Item> extends DropdownItemProps, GetItemPropsOptions<Item> {
  children: ReactNode;
}

interface MenuProps extends Omit<DropdownProps<DropdownItem>, 'onChange'>, GetMenuPropsOptions, GetPropsCommonOptions {
  children: ReactNode;
}

type ToggleProps = DropdownToggleProps & GetToggleButtonPropsOptions;

function DownshiftComponents({ children, ...rest }: DownshiftComponentsProps<DropdownItem>) {
  return (
    <Downshift {...rest}>
      {downshift => (
        <div>
          <DownshiftContext.Provider value={downshift}>{children}</DownshiftContext.Provider>
        </div>
      )}
    </Downshift>
  );
}

function withDownshift(
  type: 'toggle',
  Component: FunctionComponent<ToggleProps & Downshift<DropdownItem>>,
): ComponentType<ToggleProps>;
function withDownshift(
  type: 'item',
  Component: FunctionComponent<ItemProps<DropdownItem> & Downshift<DropdownItem>>,
): ComponentType<ItemProps<DropdownItem>>;
function withDownshift(
  type: 'menu',
  Component: FunctionComponent<MenuProps & Downshift<DropdownItem>>,
): ComponentType<MenuProps>;
function withDownshift(type: string, Component: any): ComponentType<any> {
  function Wrapper(props: any, ref: any) {
    return (
      <DownshiftContext.Consumer>
        {downshiftContext => <Component downshift={downshiftContext} {...props} ref={ref} />}
      </DownshiftContext.Consumer>
    );
  }

  Wrapper.displayName = `withDownshift-${type}(${Component.displayName || Component.name})`;

  return hoistNonReactStatics(React.forwardRef(Wrapper), Component);
}

export { withDownshift, DownshiftComponents as Downshift };
