import { Flex, FlexItem } from '@bigcommerce/big-design';
import React from 'react';

import { GithubLogoIcon } from '../Icons';
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
      paddingLeft="xLarge"
      paddingBottom={{ mobile: 'medium', tablet: 'xxxLarge' }}
    >
      <FlexItem>
        <SideNavLogo />
      </FlexItem>

      <SideNavMenu>
        <SideNavGroup title="Introduction">
          <SideNavLink href="/">Getting Started</SideNavLink>

          <Link url={CodeSandboxUrl} title="CodeSandbox Example" />
        </SideNavGroup>

        <SideNavGroup title="Foundations">
          <SideNavLink href="/colors">Colors</SideNavLink>
          <SideNavLink href="/icons">Icons</SideNavLink>
          <SideNavLink href="/spacing">Spacing</SideNavLink>
          <SideNavLink href="/typography">Typography</SideNavLink>
        </SideNavGroup>

        <SideNavGroup title="Layout">
          <SideNavLink href="/collapse">Collapse</SideNavLink>
          <SideNavLink href="/modal">Modal</SideNavLink>
          <SideNavLink href="/pagination">Pagination</SideNavLink>
          <SideNavLink href="/panel">Panel</SideNavLink>
          <SideNavLink href="/statefulTable">StatefulTable</SideNavLink>
          <SideNavLink href="/statefulTree">StatefulTree</SideNavLink>
          <SideNavLink href="/table">Table</SideNavLink>
          <SideNavLink href="/tabs">Tabs</SideNavLink>
          <SideNavLink href="/worksheet">Worksheet</SideNavLink>
        </SideNavGroup>

        <SideNavGroup title="Actions &amp; Inputs">
          <SideNavLink href="/button">Button</SideNavLink>
          <SideNavLink href="/button-group">ButtonGroup</SideNavLink>
          <SideNavLink href="/checkbox">Checkbox</SideNavLink>
          <SideNavLink href="/counter">Counter</SideNavLink>
          <SideNavLink href="/datepicker">Datepicker</SideNavLink>
          <SideNavLink href="/dropdown">Dropdown</SideNavLink>
          <SideNavLink href="/form">Form</SideNavLink>
          <SideNavLink href="/input">Input</SideNavLink>
          <SideNavLink href="/link">Link</SideNavLink>
          <SideNavLink href="/multi-select">MultiSelect</SideNavLink>
          <SideNavLink href="/pill-tabs">PillTabs</SideNavLink>
          <SideNavLink href="/radio">Radio</SideNavLink>
          <SideNavLink href="/search">Search</SideNavLink>
          <SideNavLink href="/select">Select</SideNavLink>
          <SideNavLink href="/switch">Switch</SideNavLink>
          <SideNavLink href="/textarea">Textarea</SideNavLink>
          <SideNavLink href="/timepicker">Timepicker</SideNavLink>
        </SideNavGroup>

        <SideNavGroup title="Status &amp; Feedback">
          <SideNavLink href="/alert">Alert</SideNavLink>
          <SideNavLink href="/badge">Badge</SideNavLink>
          <SideNavLink href="/inline-message">InlineMessage</SideNavLink>
          <SideNavLink href="/message">Message</SideNavLink>
          <SideNavLink href="/progress-bar">ProgressBar</SideNavLink>
          <SideNavLink href="/progress-circle">ProgressCircle</SideNavLink>
          <SideNavLink href="/stepper">Stepper</SideNavLink>
          <SideNavLink href="/tooltip">Tooltip</SideNavLink>
        </SideNavGroup>

        <SideNavGroup title="Utilities">
          <SideNavLink href="/box">Box</SideNavLink>
          <SideNavLink href="/breakpoints">Breakpoints</SideNavLink>
          <SideNavLink href="/display">Display</SideNavLink>
          <SideNavLink href="/flex">Flex</SideNavLink>
          <SideNavLink href="/grid">Grid</SideNavLink>
          <SideNavLink href="/margin">Margin</SideNavLink>
          <SideNavLink href="/padding">Padding</SideNavLink>
          <SideNavLink href="/popover">Popover</SideNavLink>
        </SideNavGroup>

        <SideNavGroup title="Helpful Links">
          <Link
            url="https://github.com/bigcommerce/big-design"
            icon={<GithubLogoIcon title="Github Logo" />}
            title="Github"
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
