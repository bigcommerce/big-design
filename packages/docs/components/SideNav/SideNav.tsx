import { Flex, FlexItem } from '@bigcommerce/big-design';
import React from 'react';

import { BigDesignLogoIcon, GithubLogoIcon } from '../Icons';
import { List } from '../List';

import { SideNavGroup } from './SideNavGroup';
import { SideNavLink, StyledLink } from './SideNavLink';
import { SideNavLogo } from './SideNavLogo';
import { SideNavMenu } from './SideNavMenu';
import { StyledFlex } from './styled';

const CodeSandboxUrl = process.env.CODE_SANDBOX_URL as string;

export const SideNav: React.FC = () => {
  return (
    <StyledFlex
      flexDirection={{ mobile: 'row', tablet: 'column' }}
      alignContent={{ mobile: 'center', tablet: 'stretch' }}
      justifyContent={{ mobile: 'space-between', tablet: 'flex-start' }}
      padding="medium"
      paddingBottom={{ mobile: 'medium', tablet: 'xxxLarge' }}
    >
      <FlexItem>
        <SideNavLogo />
      </FlexItem>

      <SideNavMenu>
        <SideNavGroup title="Introduction">
          <SideNavLink href="/GettingStarted/GettingStartedPage" as="/">
            Getting Started
          </SideNavLink>

          <Link url={CodeSandboxUrl} title="CodeSandbox Example" />
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
          <SideNavLink href="/Collapse/CollapsePage" as="/collapse">
            Collapse
          </SideNavLink>
          <SideNavLink href="/Modal/ModalPage" as="/modal">
            Modal
          </SideNavLink>
          <SideNavLink href="/Pagination/PaginationPage" as="/pagination">
            Pagination
          </SideNavLink>
          <SideNavLink href="/Panel/PanelPage" as="/panel">
            Panel
          </SideNavLink>
          <SideNavLink href="/Table/TablePage" as="/table">
            Table
          </SideNavLink>
          <SideNavLink href="/StatefulTable/StatefulTablePage" as="/statefulTable">
            StatefulTable
          </SideNavLink>
          <SideNavLink href="/StatefulTree/StatefulTreePage" as="/statefulTree">
            StatefulTree
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
          <SideNavLink href="/Counter/CounterPage" as="/counter">
            Counter
          </SideNavLink>
          <SideNavLink href="/Datepicker/DatepickerPage" as="/datepicker">
            Datepicker
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
          <SideNavLink href="/MultiSelect/MultiSelectPage" as="/multi-select">
            MultiSelect
          </SideNavLink>
          <SideNavLink href="/Switch/SwitchPage" as="/switch">
            Switch
          </SideNavLink>
          <SideNavLink href="/Textarea/TextareaPage" as="/textarea">
            Textarea
          </SideNavLink>
          <SideNavLink href="/Timepicker/TimepickerPage" as="/timepicker">
            Timepicker
          </SideNavLink>
        </SideNavGroup>

        <SideNavGroup title="Status &amp; Feedback">
          <SideNavLink href="/Alert/AlertPage" as="/alert">
            Alert
          </SideNavLink>
          <SideNavLink href="/Badge/BadgePage" as="/badge">
            Badge
          </SideNavLink>
          <SideNavLink href="/InlineMessage/InlineMessagePage" as="/inline-alert">
            Inline Message
          </SideNavLink>
          <SideNavLink href="/Message/MessagePage" as="/message">
            Message
          </SideNavLink>
          <SideNavLink href="/Progress/ProgressBarPage" as="/progress-bar">
            Progress Bar
          </SideNavLink>
          <SideNavLink href="/Progress/ProgressCirclePage" as="/progress-circle">
            Progress Circle
          </SideNavLink>
          <SideNavLink href="/Stepper/StepperPage" as="/stepper">
            Stepper
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
          <SideNavLink href="/Display/DisplayPage" as="/display">
            Display
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
          <SideNavLink href="/Popover/PopoverPage" as="/popover">
            Popover
          </SideNavLink>
        </SideNavGroup>

        <SideNavGroup title="Helpful Links">
          <Link
            url="https://github.com/bigcommerce/big-design"
            icon={<GithubLogoIcon title="Github Logo" />}
            title="Github"
          />
          <Link
            url="https://design.bigcommerce.com/components"
            icon={<BigDesignLogoIcon title="BigDesign Logo" />}
            title="Design Guidelines"
          />
        </SideNavGroup>
      </SideNavMenu>
    </StyledFlex>
  );
};

const Link: React.FC<{ url: string; icon?: React.ReactNode; title: string }> = ({ url, icon, title }) => {
  const getChildrenWithIcon = () => (
    <Flex alignItems="center">
      {icon} <FlexItem marginLeft="xSmall">{title}</FlexItem>
    </Flex>
  );

  return (
    <List.Item>
      <StyledLink href={url} target="_blank">
        {icon ? getChildrenWithIcon() : title}
      </StyledLink>
    </List.Item>
  );
};
