import { Text } from '@bigcommerce/big-design';
import { ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import React, { HTMLAttributes, memo } from 'react';

import { useUniqueId } from '../../../hooks';
import { Box, BoxProps } from '../../Box/Box';
import { useAccordion } from '../hooks/useAccordion';

import { StyledAccordionButton, StyledAccordionContent } from './styled';

export interface AccordionPanelProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  defaultExpanded?: boolean;
  header: string;
  iconLeft?: React.ReactNode;
  isExpanded: boolean;
  onClick?: () => void;
}

export const AccordionPanel: React.FC<AccordionPanelProps & BoxProps> = memo(
  ({ children, header, iconLeft, defaultExpanded = false, className, style, ...props }) => {
    const { isExpanded, onClick } = useAccordion(defaultExpanded);
    const accordionId = useUniqueId('accordion');
    const accordionItemId = useUniqueId('accordion-item');

    return (
      <Box {...props}>
        <StyledAccordionButton
          aria-controls={accordionItemId}
          aria-expanded={isExpanded}
          iconLeft={iconLeft}
          iconRight={<ExpandMoreIcon className="collapse-icon" color="secondary70" />}
          id={accordionId}
          isExpanded={isExpanded}
          onClick={onClick}
          variant="subtle"
        >
          <Text marginBottom="none" marginLeft={iconLeft ? 'xxxLarge' : 'none'}>
            {header}
          </Text>
        </StyledAccordionButton>
        <StyledAccordionContent
          aria-labelledby={accordionId}
          display={isExpanded ? 'block' : 'none'}
          hidden={!isExpanded}
          iconLeft={iconLeft}
          id={accordionItemId}
          role="region"
        >
          {children}
        </StyledAccordionContent>
      </Box>
    );
  },
);
