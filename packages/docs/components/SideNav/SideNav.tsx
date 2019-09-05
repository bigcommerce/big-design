import { Flex } from '@bigcommerce/big-design';
import React from 'react';

import { StyledFlex } from './styled';
import { SideNavGroup } from './SideNavGroup';
import { SideNavLink } from './SideNavLink';
import { SideNavLogo } from './SideNavLogo';
import { SideNavMenu } from './SideNavMenu';

export const SideNav: React.FC = () => {
  return (
    <StyledFlex
      flexDirection={{ mobile: 'row', tablet: 'column' }}
      alignContent={{ mobile: 'center', tablet: 'stretch' }}
      justifyContent={{ mobile: 'space-between', tablet: 'flex-start' }}
      padding="medium"
      paddingBottom={{ mobile: 'medium', tablet: 'xxxLarge' }}
    >
      <Flex.Item>
        <SideNavLogo />
      </Flex.Item>

      <SideNavMenu>
        <SideNavGroup title="Introduction">
          <SideNavLink href="/GettingStarted/GettingStartedPage" as="/">
            Getting Started
          </SideNavLink>
        </SideNavGroup>

        <SideNavGroup title="Foundations">
          <SideNavLink href="/Colors/ColorsPage" as="/colors">
            Colors
          </SideNavLink>
          <SideNavLink href="/Icons/IconsPage" as="/icons">
            Icons
          </SideNavLink>
          <SideNavLink href="/Spacing/SpacingPage" as="/spacing">
            Spacing
          </SideNavLink>
          <SideNavLink href="/Typography/TypographyPage" as="/typography">
            Typography
          </SideNavLink>
        </SideNavGroup>

        <SideNavGroup title="Layout">
          <SideNavLink href="/Modal/ModalPage" as="/modal">
            Modal
          </SideNavLink>
          <SideNavLink href="/Pagination/PaginationPage" as="/Pagination">
            Pagination
          </SideNavLink>
          <SideNavLink href="/Panel/PanelPage" as="/panel">
            Panel
          </SideNavLink>
          <SideNavLink href="/Tabs/TabsPage" as="/tabs">
            Tabs
          </SideNavLink>
        </SideNavGroup>

        <SideNavGroup title="Actions &amp; Inputs">
          <SideNavLink href="/Button/ButtonPage" as="/button">
            Button
          </SideNavLink>
          <SideNavLink href="/Checkbox/CheckboxPage" as="/checkbox">
            Checkbox
          </SideNavLink>
          <SideNavLink href="/Dropdown/DropdownPage" as="/dropdown">
            Dropdown
          </SideNavLink>
          <SideNavLink href="/Form/FormPage" as="/form">
            Form
          </SideNavLink>
          <SideNavLink href="/Input/InputPage" as="/input">
            Input
          </SideNavLink>
          <SideNavLink href="/Link/LinkPage" as="/link">
            Link
          </SideNavLink>
          <SideNavLink href="/Radio/RadioPage" as="/radio">
            Radio
          </SideNavLink>
          <SideNavLink href="/Select/SelectPage" as="/select">
            Select
          </SideNavLink>
          <SideNavLink href="/Textarea/TextareaPage" as="/textarea">
            Textarea
          </SideNavLink>
        </SideNavGroup>

        <SideNavGroup title="Status &amp; Feedback">
          <SideNavLink href="/Badge/BadgePage" as="/badge">
            Badge
          </SideNavLink>
          <SideNavLink href="/Progress/ProgressBarPage" as="/progress-bar">
            Progress Bar
          </SideNavLink>
          <SideNavLink href="/Progress/ProgressCirclePage" as="/progress-circle">
            Progress Circle
          </SideNavLink>
          <SideNavLink href="/Tooltip/TooltipPage" as="/tooltip">
            Tooltip
          </SideNavLink>
        </SideNavGroup>

        <SideNavGroup title="Utilities">
          <SideNavLink href="/Box/BoxPage" as="/box">
            Box
          </SideNavLink>
          <SideNavLink href="/Breakpoints/BreakpointsPage" as="/breakpoints">
            Breakpoints
          </SideNavLink>
          <SideNavLink href="/Flex/FlexPage" as="/flex">
            Flex
          </SideNavLink>
          <SideNavLink href="/Grid/GridPage" as="/grid">
            Grid
          </SideNavLink>
          <SideNavLink href="/Margin/MarginPage" as="/margin">
            Margin
          </SideNavLink>
          <SideNavLink href="/Padding/PaddingPage" as="/padding">
            Padding
          </SideNavLink>
        </SideNavGroup>
      </SideNavMenu>
    </StyledFlex>
  );
};
