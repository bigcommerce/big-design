import { Box, Flex } from '@bigcommerce/big-design';
import Link from 'next/link';

export const SideNav: React.FC = () => {
  return (
    <Flex flexDirection="column" elevation="raised" style={{ minHeight: '100vh', height: '100%' }}>
      <Box margin="large">
        <img src="/static/logo.svg" alt="BigDesign Logo" />
      </Box>

      <Link href="/">
        <a>Getting Started</a>
      </Link>

      <Link href="/Badge/BadgePage" as="/badge">
        <a>Badge</a>
      </Link>

      <Link href="/Box/BoxPage" as="/box">
        <a>Box</a>
      </Link>

      <Link href="/Button/ButtonPage" as="/button">
        <a>Button</a>
      </Link>

      <Link href="/Colors/ColorsPage" as="/colors">
        <a>Colors</a>
      </Link>

      <Link href="/Dropdown/DropdownPage" as="/dropdown">
        <a>Dropdown</a>
      </Link>

      <Link href="/Flex/FlexPage" as="/flex">
        <a>Flex</a>
      </Link>

      <Link href="/Form/FormPage" as="/form">
        <a>Form</a>
      </Link>

      <Link href="/Form/InputPage" as="/form/input">
        <a>Form - Input</a>
      </Link>

      <Link href="/Form/CheckboxPage" as="/form/checkbox">
        <a>Form - Checkbox</a>
      </Link>

      <Link href="/Form/RadioPage" as="/form/radio">
        <a>Form - Radio</a>
      </Link>

      <Link href="/Form/SelectPage" as="/form/select">
        <a>Form - Select</a>
      </Link>

      <Link href="/Form/TextareaPage" as="/form/textarea">
        <a>Form - Textarea</a>
      </Link>

      <Link href="/Grid/GridPage" as="/grid">
        <a>Grid</a>
      </Link>

      <Link href="/Icons/IconsPage" as="/icons">
        <a>Icons</a>
      </Link>

      <Link href="/Link/LinkPage" as="/link">
        <a>Link</a>
      </Link>

      <Link href="/Utilities/MarginPage" as="/utilities/margin">
        <a>Utilities - Margin</a>
      </Link>

      <Link href="/Utilities/PaddingPage" as="/utilities/padding">
        <a>Utilities - Padding</a>
      </Link>

      <Link href="/Modal/ModalPage" as="/modal">
        <a>Modal</a>
      </Link>

      <Link href="/Panel/PanelPage" as="/panel">
        <a>Panel</a>
      </Link>

      <Link href="/Progress/ProgressBarPage" as="/progress/bar">
        <a>Progress - Bar</a>
      </Link>

      <Link href="/Progress/ProgressCirclePage" as="/progress/circle">
        <a>Progress - Circle</a>
      </Link>

      <Link href="/Tabs/TabsPage" as="/tabs">
        <a>Tabs</a>
      </Link>

      <Link href="/Tooltip/TooltipPage" as="/tooltip">
        <a>Tooltip</a>
      </Link>

      <Link href="/Typography/TypographyPage" as="/typography">
        <a>Typography</a>
      </Link>
    </Flex>
  );
};
