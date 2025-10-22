import { Text } from '@bigcommerce/big-design';
import { ChevronRightIcon, ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import React, { KeyboardEventHandler, useState } from 'react';

import { StyledFlex } from './styled';

interface CollapsibleProps {
  readonly children?: React.ReactNode;
  readonly title: string;
}

export const Collapsible: React.FC<CollapsibleProps> = ({ children, title }) => {
  const [isCollapsed, setCollapsed] = useState(true);
  const toggleIsCollapsed = () => setCollapsed(!isCollapsed);

  const handleKeyPressed: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleIsCollapsed();
    }
  };

  return (
    <>
      <StyledFlex
        alignItems="center"
        marginBottom="xSmall"
        onClick={toggleIsCollapsed}
        onKeyDown={handleKeyPressed}
        tabIndex={0}
      >
        {isCollapsed ? <ChevronRightIcon title="Expand" /> : <ExpandMoreIcon title="Collapse" />}
        <Text>{title}</Text>
      </StyledFlex>

      {!isCollapsed && children}
    </>
  );
};
