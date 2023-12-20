import { Button, Flex, FlexItem } from '@bigcommerce/big-design';
import { MenuIcon } from '@bigcommerce/big-design-icons';
import { default as Router } from 'next/router';
import React, { useState } from 'react';

import { StyledMenu, StyledNavigation } from './styled';

export const SideNavMenu: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleClick = () => setIsExpanded(!isExpanded);

  Router.events.on('routeChangeComplete', () => setIsExpanded(false));

  return (
    <FlexItem style={{ display: 'flex', alignItems: 'center' }}>
      <Flex>
        <StyledMenu>
          <Button
            iconOnly={<MenuIcon color="secondary70" />}
            onClick={handleClick}
            variant="subtle"
          />
        </StyledMenu>
        <StyledNavigation
          borderBottom="box"
          borderTop="box"
          isExpanded={isExpanded}
          shadow="floating"
        >
          {children}
        </StyledNavigation>
      </Flex>
    </FlexItem>
  );
};
