import { defaultTheme, Box, Flex, H0, H2, Text, ThemeInterface } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { CodePreview } from '../../components';

import { StyledColor } from './styled';

const { colors } = defaultTheme;
const COLORS_TO_OMIT = ['primary', 'secondary', 'danger', 'warning', 'success'];
type Color = keyof ThemeInterface['colors'];

storiesOf('Colors', module).add('Overview', () => (
  <>
    <H0>Colors</H0>

    <Text>Colors can be used directly on some of our components that expect a color as a prop:</Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Box backgroundColor="primary20">Box example</Box>
      {/* jsx-to-string:end */}
    </CodePreview>

    <Text>You can also use the colors directly from the theme to style other components, for eg:</Text>

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

    <Flex direction="column">
      {getColors().map(color => (
        <Flex alignItems="center">
          <StyledColor backgroundColor={color as Color} />
          <Text marginLeft="medium">{getColorLabel(color)}</Text>
        </Flex>
      ))}
    </Flex>
  </>
));

function getColors() {
  return Object.keys(colors).filter(color => !COLORS_TO_OMIT.includes(color));
}

function getColorLabel(color: string) {
  return color.includes('40') ? `${color} / ${color.replace('40', '')}` : color;
}
