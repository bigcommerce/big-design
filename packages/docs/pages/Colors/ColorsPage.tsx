import { Box, Flex, H0, H2, Text } from '@bigcommerce/big-design';
import { remCalc, ThemeInterface } from '@bigcommerce/big-design-theme';
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { CodePreview } from '../../components';

const COLORS_TO_OMIT = ['primary', 'secondary', 'danger', 'warning', 'success'];
type Colors = ThemeInterface['colors'];
type Color = keyof Colors;

const StyledColor = styled(Box)`
  height: ${remCalc(30)};
  width: ${remCalc(300)};
`;

export default () => {
  const { colors } = useContext(ThemeContext);

  return (
    <>
      <H0>Colors</H0>

      <Text>Colors can be used directly on some of our components that expect a color as a prop:</Text>

      <CodePreview>
        {/* jsx-to-string:start */}
        <Box backgroundColor="primary20">Box example</Box>
        {/* jsx-to-string:end */}
      </CodePreview>

      <Text>You can also use the colors directly from the theme to style other components, for example:</Text>

      <CodePreview>
        {/* jsx-to-string:start */}
        {function Example() {
          const StyledBox = styled(Box)(({ theme }) => ({
            backgroundColor: theme.colors.primary20,
          }));

          return <StyledBox>StyledBox Example</StyledBox>;
        }}
        {/* jsx-to-string:end */}
      </CodePreview>

      <H2>Available Colors</H2>

      <Flex flexDirection="column">
        {getFilteredColors(colors).map(color => (
          <Flex alignItems="center" key={color}>
            <StyledColor backgroundColor={color as Color} />
            <Text marginLeft="medium">{getColorLabel(color)}</Text>
          </Flex>
        ))}
      </Flex>
    </>
  );
};

function getFilteredColors(colors: Colors) {
  return Object.keys(colors).filter(color => !COLORS_TO_OMIT.includes(color));
}

function getColorLabel(color: string) {
  return color.includes('40') ? `${color} / ${color.replace('40', '')}` : color;
}
