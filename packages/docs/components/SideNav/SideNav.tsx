import { StyledFlex } from './styled';
import { SideNavGroup } from './SideNavGroup';
import { SideNavLink } from './SideNavLink';

export const SideNav: React.FC = () => {
  return (
    <StyledFlex flexDirection="column" padding="medium" paddingBottom="xxxLarge" backgroundColor="white">
      <img src="/static/logo.svg" alt="BigDesign Logo" />

      <SideNavGroup title="Foundation">
        <SideNavLink href="/">Getting Started</SideNavLink>
        <SideNavLink href="/Colors/ColorsPage" as="/colors">
          Colors
        </SideNavLink>
        <SideNavLink href="/Typography/TypographyPage" as="/typography">
          Typography
        </SideNavLink>
        <SideNavLink href="/Button/ButtonPage" as="/button">
          Button
        </SideNavLink>
        <SideNavLink href="/Icons/IconsPage" as="/icons">
          Icons
        </SideNavLink>
      </SideNavGroup>

      <SideNavGroup title="Forms">
        <SideNavLink href="/Form/FormPage" as="/form">
          Overview
        </SideNavLink>
        <SideNavLink href="/Form/InputPage" as="/form/input">
          Input
        </SideNavLink>
        <SideNavLink href="/Form/CheckboxPage" as="/form/checkbox">
          Checkbox
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
        <SideNavLink href="/Dropdown/DropdownPage" as="/dropdown">
          Dropdown
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
        <SideNavLink href="/Link/LinkPage" as="/link">
          Link
        </SideNavLink>
      </SideNavGroup>
    </StyledFlex>
  );
};
