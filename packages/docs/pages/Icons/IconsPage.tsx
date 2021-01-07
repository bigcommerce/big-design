import { Flex, Form, FormGroup, H0, H1, Link, Select, Text } from '@bigcommerce/big-design';
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
      <H0>Icons</H0>

      <Text>
        Icons live in a separate package <Code>@bigcommerce/big-design-icons</Code>. To use the icons you will first
        need to add the package to your app using <Code>npm install @bigcommerce/big-design-icons</Code> or{' '}
        <Code>yarn add @bigcommerce/big-design-icons</Code>.
      </Text>

      <H1>Usage</H1>

      <Text>To use an icon import the component from the package:</Text>

      <CodeSnippet>{`import { CheckIcon } from '@bigcommerce/big-design-icons';`}</CodeSnippet>

      <Text>Use it anywhere in your app:</Text>

      <CodePreview>
        {/* jsx-to-string:start */}
        <CheckIcon color="success" size="xxxLarge" />
        {/* jsx-to-string:end */}
      </CodePreview>

      <H1>API</H1>
      <IconPropTable />

      <H1>Available Icons</H1>

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

      <H0 marginTop="xxxLarge">Flags</H0>

      <Text>
        Flags are a submodule in the separate Icons package <Code>@bigcommerce/big-design-icons/flags</Code>. To use the
        Flags you will first need to add the Icons package to your app using{' '}
        <Code>npm install @bigcommerce/big-design-icons</Code> or <Code>yarn add @bigcommerce/big-design-icons</Code>.{' '}
        <Link href="https://design.bigcommerce.com/components/iconography" target="_blank">
          Iconography Design Guidelines
        </Link>
        .
      </Text>

      <Text>
        A complete list of available flags is located{' '}
        <Link href="https://flagicons.lipis.dev/" target="_blank">
          here
        </Link>
        .
      </Text>

      <H1>Usage</H1>

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

      <H1>API</H1>
      <FlagIconPropTable />
    </>
  );
};

export default IconsPage;
