import { Text } from '@bigcommerce/big-design';
import { ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import React, { HTMLAttributes, memo } from 'react';

import { useUniqueId } from '../../../hooks';
import { BoxProps } from '../../Box/Box';
import { useAccordion } from '../hooks/useAccordion';

import { StyledAccordion, StyledAccordionButton, StyledAccordionContent } from './styled';

export interface AccordionPanelProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  header: string;
  isExpanded: boolean;
  onClick?: () => void;
  iconLeft?: React.ReactNode;
  defaultExpanded?: boolean;
}

export const AccordionPanel: React.FC<AccordionPanelProps & BoxProps> = memo(
  ({ children, header, iconLeft, defaultExpanded = false, className, style, ...props }) => {
    const { isExpanded, onClick } = useAccordion(defaultExpanded);
    const accordionId = useUniqueId('accordion');
    const accordionItemId = useUniqueId('accordion-item');

    return (
      <StyledAccordion {...props}>
        <StyledAccordionButton
          {...props}
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
          {...props}
          aria-labelledby={accordionId}
          display={isExpanded ? 'block' : 'none'}
          hidden={!isExpanded}
          iconLeft={iconLeft}
          id={accordionItemId}
          role="region"
        >
          {children}
        </StyledAccordionContent>
      </StyledAccordion>
    );
  },
);
