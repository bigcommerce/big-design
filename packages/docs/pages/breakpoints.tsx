import { BoxProps, Box as Container, H1, Message, Panel, Text } from '@bigcommerce/big-design';
import { breakpointValues } from '@bigcommerce/big-design-theme';
import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable } from '../components';

const Box: React.FC<BoxProps> = ({ children, ...props }) => (
  <Container backgroundColor="secondary10" border="box" {...props}>
    {children}
  </Container>
);

const BreakpointsPage = () => (
  <>
    <H1>Breakpoints</H1>

    <Panel header="Overview" headerId="overview">
      <Text>
        BigDesign exposes a set of <Code primary>breakpoints</Code> and <Code primary>breakpointValues</Code> that can
        be used to create responsive layouts and components. Our breakpoints include <Code primary>mobile</Code>,{' '}
        <Code primary>tablet</Code> and <Code primary>desktop</Code>. For each breakpoint, the breakpoint values are{' '}
        <Code>{breakpointValues.mobile}</Code>, <Code>{breakpointValues.tablet}</Code>, and{' '}
        <Code>{breakpointValues.desktop}</Code> respectively.
      </Text>
    </Panel>

    <Panel header="Implementation" headerId="implementation">
      <ContentRoutingTabs
        id="implementation"
        routes={[
          {
            id: 'basic',
            title: 'Basic',
            render: () => (
              <Fragment key="basic">
                <Text>
                  Most utility components contain responsive props. You can pass in an object with{' '}
                  <Code primary>breakpoints</Code> as keys to provide values at each breakpoint. BigDesign is
                  mobile-first in nature, so bigger screen size values will override smaller ones.
                </Text>

                <CodePreview scope={{ Box }}>
                  {/* jsx-to-string:start */}
                  <Box padding={{ mobile: 'none', tablet: 'small', desktop: 'xLarge' }}>
                    This box has responsive props!
                  </Box>
                  {/* jsx-to-string:end */}
                </CodePreview>
              </Fragment>
            ),
          },
          {
            id: 'extending',
            title: 'Extending',
            render: () => (
              <Fragment key="extending">
                <Message
                  messages={[
                    { text: 'Before extending a component, if possible, use one of BigDesigns core components.' },
                  ]}
                  type="warning"
                  marginVertical="medium"
                />
                <Text>
                  If you need a customized wrapper you can extend one of our utility components (
                  <Code primary>Box</Code>, <Code primary>Flex</Code>, or <Code primary>Grid</Code>) using{' '}
                  <Code>styled-components</Code>. Exposed on the <Code primary>theme</Code> object is the{' '}
                  <Code primary>breakpoints</Code> key. The values returned are <Code>@media</Code> queries ready for
                  consumtion.
                </Text>

                <CodePreview scope={{ Box }}>
                  {/* jsx-to-string:start */}
                  {function Example() {
                    const StyledBox = styled(Box)`
                      height: ${({ theme }) => theme.spacing.xxxLarge};
                      width: 100%;

                      ${({ theme }) => theme.breakpoints.tablet} {
                        width: 60%;
                      }

                      ${({ theme }) => theme.breakpoints.desktop} {
                        width: 30%;
                      }
                    `;

                    return <StyledBox />;
                  }}
                  {/* jsx-to-string:end */}
                </CodePreview>
              </Fragment>
            ),
          },
          {
            id: 'breakpoint-values',
            title: 'Breakpoint Values',
            render: () => (
              <Fragment key="breakpoint-values">
                <Text>
                  <Code primary>breakpointValues</Code> are also exposed on the <Code primary>theme</Code> object. Each
                  value is the <Code>px</Code> value of each breakpoint.
                </Text>

                <CodePreview scope={{ Box }}>
                  {/* jsx-to-string:start */}
                  {function Example() {
                    const StyledBox = styled(Box)`
                      height: ${({ theme }) => theme.spacing.xxxLarge};
                      width: 100%;

                      ${({ theme }) => theme.breakpoints.desktop} {
                        width: ${({ theme }) => theme.breakpointValues.tablet};
                      }
                    `;

                    return <StyledBox />;
                  }}
                  {/* jsx-to-string:end */}
                </CodePreview>
              </Fragment>
            ),
          },
        ]}
      />
    </Panel>

    <Panel header="Do's and Don'ts" headerId="guidelines">
      <GuidelinesTable recommended={['Use built in responsive props, where applicable.']} discouraged={[]} />
    </Panel>
  </>
);

export default BreakpointsPage;
