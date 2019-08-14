import { Button, Flex } from '@bigcommerce/big-design';
import { MenuIcon } from '@bigcommerce/big-design-icons';
import { default as Router } from 'next/router';
import React from 'react';

import { StyledMenu, StyledNavigation } from './styled';

export const SideNavMenu: React.FC = props => {
  const [shown, setShown] = React.useState(false);
  const handleClick = () => setShown(!shown);
  Router.events.on('routeChangeComplete', () => setShown(false));

  return (
    <Flex.Item style={{ display: 'flex', alignItems: 'center' }}>
      <Flex>
        <StyledMenu>
          <Button variant="subtle" onClick={handleClick} iconOnly={<MenuIcon color="secondary70" />} />
        </StyledMenu>
        <StyledNavigation shown={shown} borderBottom="box" borderTop="box" shadow="floating">
          {props.children}
        </StyledNavigation>
      </Flex>
    </Flex.Item>
  );
};
