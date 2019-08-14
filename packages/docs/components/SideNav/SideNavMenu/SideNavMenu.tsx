import { Button, Flex } from '@bigcommerce/big-design';
import { MenuIcon } from '@bigcommerce/big-design-icons';
import { default as Router } from 'next/router';
import React from 'react';

import { StyledMenu, StyledNavigation } from './styled';

export const SideNavMenu: React.FC = props => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleClick = () => setIsExpanded(!isExpanded);
  Router.events.on('routeChangeComplete', () => setIsExpanded(false));

  return (
    <Flex.Item style={{ display: 'flex', alignItems: 'center' }}>
      <Flex>
        <StyledMenu>
          <Button variant="subtle" onClick={handleClick} iconOnly={<MenuIcon color="secondary70" />} />
        </StyledMenu>
        <StyledNavigation isExpanded={isExpanded} borderBottom="box" borderTop="box" shadow="floating">
          {props.children}
        </StyledNavigation>
      </Flex>
    </Flex.Item>
  );
};
