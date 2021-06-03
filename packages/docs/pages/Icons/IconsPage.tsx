import { Flex, Form, FormGroup, H1, H3, Link, Select, Text, Panel, Message } from '@bigcommerce/big-design';
import { CheckIcon } from '@bigcommerce/big-design-icons';
import {
  ARFlagIcon,
  AUFlagIcon,
  CAFlagIcon,
  CLFlagIcon,
  CNFlagIcon,
  DEFlagIcon,
  FRFlagIcon,
  GBFlagIcon,
  JPFlagIcon,
  KRFlagIcon,
  MXFlagIcon,
  RUFlagIcon,
  USFlagIcon,
} from '@bigcommerce/big-design-icons/flags';
import React, { useEffect, useState } from 'react';

import { Code, CodePreview, CodeSnippet } from '../../components';
import { FlagIconPropTable, IconPropTable } from '../../PropTables';

const IconsPage = () => {
  const [icons, setIcons] = useState<{}>({});

  useEffect(() => {
    const fetchIcons = async () => {
      const { createStyledIcon, useUniqueId, ...iconsModule } = await import('@bigcommerce/big-design-icons');

      setIcons(iconsModule);
    };

    fetchIcons();
  }, []);

  return (
    <>
      <H1>Icons</H1>

      <Panel>
        <Text>To use an icon import the component from the package:</Text>
        <CodeSnippet>{`import { CheckIcon } from '@bigcommerce/big-design-icons';`}</CodeSnippet>
        <Text>Use it anywhere in your app:</Text>
        <CodePreview lastChild>
          {/* jsx-to-string:start */}
          <CheckIcon color="success" size="xxxLarge" />
          {/* jsx-to-string:end */}
        </CodePreview>
      </Panel>

      <Message
        type="warning"
        messages={[
          {
            text:
              'Icons live in the package "@bigcommerce/big-design-icons", you will need to add the package first using "yarn add @bigcommerce/big-design-icons".',
          },
        ]}
        marginBottom="medium"
      />

      <IconPropTable />

      <Panel header="Available icons">
        <Flex flexWrap="wrap" justifyContent="center">
          {Object.keys(icons).map((iconName) => {
            const Icon = icons[iconName];

            return (
              <Flex
                key={iconName}
                style={{ width: '300px' }}
                flexDirection="column"
                borderRadius="normal"
                justifyContent="center"
                alignItems="center"
                padding="large"
              >
                <Icon size="xxxLarge" />
                <Code>{`<${iconName} />`}</Code>
              </Flex>
            );
          })}
        </Flex>
      </Panel>

      <Panel header="Flags">
        <Text>
          A complete list of available flags is located{' '}
          <Link href="https://flagicons.lipis.dev/" target="_blank">
            here
          </Link>
          .
        </Text>

        <Text>To use a flag import the component from the package:</Text>

        <CodeSnippet>{`import { USFlagIcon } from '@bigcommerce/big-design-icons/flags';`}</CodeSnippet>

        <Text>Use it anywhere in your app:</Text>

        <CodePreview scope={{ USFlagIcon }}>
          {/* jsx-to-string:start */}
          <USFlagIcon size="xxxLarge" />
          {/* jsx-to-string:end */}
        </CodePreview>

        <CodePreview
          scope={{
            ARFlagIcon,
            AUFlagIcon,
            CAFlagIcon,
            CLFlagIcon,
            CNFlagIcon,
            DEFlagIcon,
            FRFlagIcon,
            GBFlagIcon,
            JPFlagIcon,
            KRFlagIcon,
            MXFlagIcon,
            RUFlagIcon,
            USFlagIcon,
          }}
          lastChild
        >
          {/* jsx-to-string:start */}
          {function Example() {
            const [value, setValue] = useState('');
            const handleChange = (val) => setValue(val);

            return (
              <Form>
                <FormGroup>
                  <Select
                    filterable={false}
                    label="Countries"
                    maxHeight={300}
                    onOptionChange={handleChange}
                    options={[
                      { value: 'us', content: 'United States', icon: <USFlagIcon /> },
                      { value: 'mx', content: 'Mexico', icon: <MXFlagIcon /> },
                      { value: 'ca', content: 'Canada', icon: <CAFlagIcon /> },
                      { value: 'en', content: 'England', icon: <GBFlagIcon /> },
                      { value: 'fr', content: 'France', icon: <FRFlagIcon /> },
                      { value: 'gr', content: 'Germany', icon: <DEFlagIcon /> },
                      { value: 'ar', content: 'Argentina', icon: <ARFlagIcon /> },
                      { value: 'ru', content: 'Russia', disabled: true, icon: <RUFlagIcon /> },
                      { value: 'ch', content: 'Chile', icon: <CLFlagIcon /> },
                      { value: 'jp', content: 'Japan', icon: <JPFlagIcon /> },
                      { value: 'cn', content: 'China', icon: <CNFlagIcon /> },
                      { value: 'sk', content: 'South Korea', icon: <KRFlagIcon /> },
                      { value: 'au', content: 'Australia', icon: <AUFlagIcon /> },
                    ]}
                    placeholder={'Choose country'}
                    placement={'bottom-start'}
                    required
                    value={value}
                  />
                </FormGroup>
              </Form>
            );
          }}
          {/* jsx-to-string:end */}
        </CodePreview>
      </Panel>

      <Message
        type="warning"
        messages={[
          {
            text:
              'Flags are a submodule of the Icons package "@bigcommerce/big-design-icons", you will need to add the package first using "yarn add @bigcommerce/big-design-icons".',
          },
        ]}
        marginBottom="medium"
      />

      <FlagIconPropTable />
    </>
  );
};

export default IconsPage;
