import { Box, H0, H1, H2, H3, H4, HR, Panel, Small, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview, NextLink, PageNavigation } from '../../components';
import { HeadingPropTable, HRPropTable, MarginPropTable, TextPropTable, TypographyPropTable } from '../../PropTables';

const TypographyPage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <>
          <Panel header="Heading">
            <CodePreview>
              {/* jsx-to-string:start */}
              <>
                <H0>Hero header - h0</H0>
                <H1>Page header - h1</H1>
                <H2>Panel header - h2</H2>
                <H3>Section header - h3</H3>
                <H4>Group header - h4</H4>
              </>
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Text">
            <CodePreview>
              {/* jsx-to-string:start */}
              <>
                <Text>Text - p</Text>
                <Small>Small text - small</Small>
              </>
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="HR">
            <CodePreview>
              {/* jsx-to-string:start */}
              <HR marginVertical="large" />
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Color">
            <Text>
              Choose any color from our{' '}
              <NextLink href="/Colors/ColorsPage" as="/colors">
                color pallete
              </NextLink>{' '}
              to style your text color.
            </Text>

            <CodePreview>
              {/* jsx-to-string:start */}
              <>
                <Text color="primary40">This color is primary40</Text>
                <Text color="danger70">This color is danger70</Text>
                <Text color="success50">This color is success50</Text>
              </>
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Text modifiers">
            <CodePreview>
              {/* jsx-to-string:start */}
              <>
                <Text bold>This text is bold.</Text>
                <Text italic>This text is italic.</Text>
                <Text strikethrough>This text is strikethrough.</Text>
                <Text underline>This text is underlined.</Text>
                <Text uppercase>This text is uppercase.</Text>
                <Text lowercase>This text is lowercase.</Text>
                <Text capitalize>This text is capitalized.</Text>
                <Text bold uppercase>
                  This text is bold and uppercase.
                </Text>
              </>
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Overflow">
            <Text>
              Setting the <Code>ellipsis</Code> prop, will allow text to overflow nicely.
            </Text>

            <CodePreview>
              {/* jsx-to-string:start */}
              <Box style={{ maxWidth: '200px' }}>
                <Text ellipsis>Indexes start at 0 and so do our headers.</Text>
              </Box>
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="As a different tag">
            <CodePreview>
              {/* jsx-to-string:start */}
              <Text as="span">This is a span.</Text>
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
        </>
      ),
    },
    {
      id: 'props',
      title: 'Props',
      render: () => (
        <>
          <HeadingPropTable
            inheritedProps={
              <>
                <TypographyPropTable collapsible />
                <MarginPropTable collapsible />
              </>
            }
          />
          <TextPropTable
            inheritedProps={
              <>
                <TypographyPropTable collapsible />
                <MarginPropTable collapsible />
              </>
            }
          />
          <HRPropTable inheritedProps={<MarginPropTable collapsible />} />
        </>
      ),
    },
  ];

  return (
    <>
      <H1>Typography</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default TypographyPage;
