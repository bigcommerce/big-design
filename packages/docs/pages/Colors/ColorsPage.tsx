import { Box, Flex, H1, Link, Text, Panel } from '@bigcommerce/big-design';
import { ThemeInterface } from '@bigcommerce/big-design-theme';
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { CodePreview } from '../../components';

const COLORS_TO_OMIT = ['primary', 'secondary', 'danger', 'warning', 'success'];
type Colors = ThemeInterface['colors'];
type Color = keyof Colors;

const StyledColor = styled(Box)`
  height: ${({ theme }) => theme.helpers.remCalc(30)};
  width: ${({ theme }) => theme.helpers.remCalc(300)};
`;

const ColorsPage = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <>
      <H1>Colors</H1>

      <Panel>
        <Text>
          Colors can be used directly on some of our components that expect a color as a prop.{' '}
          <Link href="https://design.bigcommerce.com/components/colors" target="_blank">
            Colors Design Guidelines
          </Link>
          .
        </Text>

        <CodePreview>
          {/* jsx-to-string:start */}
          <Box backgroundColor="secondary20" padding="medium">
            Box example
          </Box>
          {/* jsx-to-string:end */}
        </CodePreview>

        <Text>You can also use the colors directly from the theme to style other components, for example:</Text>

        <CodePreview lastChild>
          {/* jsx-to-string:start */}
          {function Example() {
            const StyledBox = styled(Box)(({ theme }) => ({
              backgroundColor: theme.colors.secondary20,
              padding: theme.spacing.medium,
            }));

            return <StyledBox>StyledBox Example</StyledBox>;
          }}
          {/* jsx-to-string:end */}
        </CodePreview>
      </Panel>

      <Panel header="Available colors">
        <Flex flexDirection="column">
          {getFilteredColors(colors).map((color) => (
            <Flex alignItems="center" key={color}>
              <StyledColor backgroundColor={color as Color} />
              <Text marginLeft="medium">{getColorLabel(color)}</Text>
            </Flex>
          ))}
        </Flex>
      </Panel>
    </>
  );
};

function getFilteredColors(colors: Colors) {
  return Object.keys(colors).filter((color) => !COLORS_TO_OMIT.includes(color));
}

function getColorLabel(color: string) {
  return color.includes('40') ? `${color} / ${color.replace('40', '')}` : color;
}

export default ColorsPage;
