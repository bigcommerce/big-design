import { Badge } from '@bigcommerce/big-design';
import Link from 'next/link';

import { StyledFlex, StyledLogo } from './styled';
import { SideNavGroup } from './SideNavGroup';
import { SideNavLink } from './SideNavLink';

export const SideNav: React.FC = () => {
  return (
    <StyledFlex flexDirection="column" padding="medium" paddingBottom="xxxLarge">
      <Link href="/GettingStarted/GettingStartedPage" as="/">
        <StyledLogo>
          <img src={`${process.env.URL_PREFIX}/static/logo-with-text.svg`} alt="BigDesign Logo" />
        </StyledLogo>
      </Link>

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
        <SideNavLink href="/Form/CheckboxPage" as="/form/checkbox">
          Checkbox
        </SideNavLink>
        <SideNavLink href="/Dropdown/DropdownPage" as="/dropdown">
          Dropdown
        </SideNavLink>
        <SideNavLink href="/Form/FormPage" as="/form">
          Form
        </SideNavLink>
        <SideNavLink href="/Form/InputPage" as="/form/input">
          Input
        </SideNavLink>
        <SideNavLink href="/Link/LinkPage" as="/link">
          Link
        </SideNavLink>
        <SideNavLink href="/Form/RadioPage" as="/form/radio">
          Radio
        </SideNavLink>
        <SideNavLink href="/Form/SelectPage" as="/form/select">
          Select
        </SideNavLink>
        <SideNavLink href="/Form/TextareaPage" as="/form/textarea">
          Textarea
        </SideNavLink>
      </SideNavGroup>

      <SideNavGroup title="Status &amp; Feedback">
        <SideNavLink href="/Badge/BadgePage" as="/badge">
          Badge
        </SideNavLink>
        <SideNavLink href="/Progress/ProgressBarPage" as="/progress/bar">
          Progress Bar
        </SideNavLink>
        <SideNavLink href="/Progress/ProgressCirclePage" as="/progress/circle">
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
        <SideNavLink href="/Flex/FlexPage" as="/flex">
          Flex
        </SideNavLink>
        <SideNavLink href="/Grid/GridPage" as="/grid">
          Grid
        </SideNavLink>
        <SideNavLink href="/Utilities/MarginPage" as="/utilities/margin">
          Margin
        </SideNavLink>
        <SideNavLink href="/Utilities/PaddingPage" as="/utilities/padding">
          Padding
        </SideNavLink>
      </SideNavGroup>
    </StyledFlex>
  );
};
