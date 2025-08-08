import { Box, Flex } from '@bigcommerce/big-design';
import React from 'react';

import { GithubLogoIcon } from '../Icons';

import { SideNavGroup } from './SideNavGroup';
import { SideNavLink } from './SideNavLink';
import { SideNavLogo } from './SideNavLogo';
import { SideNavMenu } from './SideNavMenu';
import {
  StyledGridItem,
  StyledScrollAreaRoot,
  StyledScrollAreaScrollbar,
  StyledScrollAreaThumb,
  StyledScrollAreaViewport,
} from './styled';

const CodeSandboxUrl = process.env.CODE_SANDBOX_URL ?? '';

export const SideNav: React.FC = () => {
  return (
    <StyledGridItem forwardedAs="nav" gridArea="nav" paddingVertical={{ tablet: 'xxLarge' }}>
      <StyledScrollAreaRoot>
        <StyledScrollAreaViewport>
          <Flex
            backgroundColor="secondary10"
            display={{ mobile: 'flex', tablet: 'block' }}
            flexDirection={{ mobile: 'row' }}
            justifyContent="space-between"
            paddingHorizontal={{ mobile: 'medium', tablet: 'none' }}
            paddingVertical={{ mobile: 'medium', tablet: 'none' }}
            shadow="raised"
            style={{ position: 'relative' }}
          >
            <SideNavLogo />

            <SideNavMenu>
              <SideNavGroup title="Introduction">
                <SideNavLink href="/">Getting Started</SideNavLink>

                <SideNavLink href={CodeSandboxUrl} target="_blank">
                  CodeSandbox Example
                </SideNavLink>
                <Box padding="xSmall" />
                <SideNavLink href="https://github.com/bigcommerce/big-design" target="_blank">
                  <Flex alignItems="center" flexDirection="row" flexGap=".5rem">
                    <GithubLogoIcon title="Github" /> Github
                  </Flex>
                </SideNavLink>
              </SideNavGroup>

              <SideNavGroup title="Foundations">
                <SideNavLink href="/colors">Colors</SideNavLink>
                <SideNavLink href="/icons">Icons</SideNavLink>
                <SideNavLink href="/spacing">Spacing</SideNavLink>
                <SideNavLink href="/typography">Typography</SideNavLink>
              </SideNavGroup>

              <SideNavGroup title="Layout">
                <SideNavLink href="/accordion-panel">Accordion Panel</SideNavLink>
                <SideNavLink href="/anchor-nav">Anchor Nav</SideNavLink>
                <SideNavLink href="/collapse">Collapse</SideNavLink>
                <SideNavLink href="/modal">Modal</SideNavLink>
                <SideNavLink href="/offset-pagination">OffsetPagination</SideNavLink>
                <SideNavLink href="/panel">Panel</SideNavLink>
                <SideNavLink href="/statefulTable">StatefulTable</SideNavLink>
                <SideNavLink href="/statefulTree">StatefulTree</SideNavLink>
                <SideNavLink href="/stateless-pagination">StatelessPagination</SideNavLink>
                <SideNavLink href="/stateless-table">StatelessTable</SideNavLink>
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
                <SideNavLink href="/file-uploader">FileUploader</SideNavLink>
                <SideNavLink href="/form">Form</SideNavLink>
                <SideNavLink href="/input">Input</SideNavLink>
                <SideNavLink href="/link">Link</SideNavLink>
                <SideNavLink href="/multi-select">MultiSelect</SideNavLink>
                <SideNavLink href="/pill-tabs">PillTabs</SideNavLink>
                <SideNavLink href="/radio">Radio</SideNavLink>
                <SideNavLink href="/search">Search</SideNavLink>
                <SideNavLink href="/select">Select</SideNavLink>
                <SideNavLink href="/switch">Switch</SideNavLink>
                <SideNavLink href="/toggle">Toggle</SideNavLink>
                <SideNavLink href="/textarea">Textarea</SideNavLink>
                <SideNavLink href="/timepicker">Timepicker</SideNavLink>
              </SideNavGroup>

              <SideNavGroup title="Status &amp; Feedback">
                <SideNavLink href="/alert">Alert</SideNavLink>
                <SideNavLink href="/badge">Badge</SideNavLink>
                <SideNavLink href="/feature-set">FeatureSet</SideNavLink>
                <SideNavLink href="/inline-message">InlineMessage</SideNavLink>
                <SideNavLink href="/lozenge">Lozenge</SideNavLink>
                <SideNavLink href="/message">Message</SideNavLink>
                <SideNavLink href="/progress-bar">ProgressBar</SideNavLink>
                <SideNavLink href="/progress-circle">ProgressCircle</SideNavLink>
                <SideNavLink href="/status-message">Status Message</SideNavLink>
                <SideNavLink href="/stepper">Stepper</SideNavLink>
                <SideNavLink href="/tooltip">Tooltip</SideNavLink>
              </SideNavGroup>

              <SideNavGroup title="Patterns">
                <SideNavLink href="/action-bar">Action Bar</SideNavLink>
                <SideNavLink href="/header">Header</SideNavLink>
                <SideNavLink href="/page">Page</SideNavLink>
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
            </SideNavMenu>
          </Flex>
        </StyledScrollAreaViewport>
        <StyledScrollAreaScrollbar orientation="vertical">
          <StyledScrollAreaThumb />
        </StyledScrollAreaScrollbar>
      </StyledScrollAreaRoot>
    </StyledGridItem>
  );
};
