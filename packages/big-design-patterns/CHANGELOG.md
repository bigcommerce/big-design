# @bigcommerce/big-design-patterns

## 1.1.0

### Minor Changes

- fd0ab6e: Added ActionBar component to complement the overall Page pattern

### Patch Changes

- a3e0fda: Updates the `Page` and `ActionBar` components to work outside of iframes. In the context of our Control Panel, we may have pages that are directly rendered. This allows a "fixed" position item to float only within the page context.
- 14ddc22: Removes unused PropsWithChildren type.
- Updated dependencies [8e09cdf]
  - @bigcommerce/big-design@1.4.1

## 1.0.0

### Major Changes

- cc19989: Releases `@bigcommerce/big-design-pattern`, a collections of useful patterns for BigDesign.

  ### New components:

  #### `Header`

  A header component that can be used to display a title, description, and actions.

  ```tsx
  import { Text, Link } from '@bigcommerce/big-design';
  import { AddIcon. ArrowDropDownIcon } from '@bigcommerce/big-design-icons';
  import { Header } from '@bigcommerce/big-design-patterns';

  export const Component = () => {
    return (
      <Header
        actions={[
          {
            text: 'Main action',
            variant: 'primary',
            iconLeft: <AddIcon />,
          },
          {
            items: [],
            toggle: {
              text: 'Secondary',
              variant: 'secondary',
              iconRight: <ArrowDropDownIcon />,
            },
          },
        ]}
        backLink={{
          text: 'Back link',
          href: '#',
          onClick: () => {
            window.alert('Back button clicked');
          },
        }}
        badge={{
          variant: 'primary',
          label: 'Beta',
        }}
        description={
          <Text>
            Main description of the page. It provides a comprehensive overview, accurately capturing
            the essence of the topic in a concise manner.{' '}
            <Link external={true} href="#" target="_blank">
              Learn more
            </Link>
          </Text>
        }
        icon={<img alt="" height={40} src="logo.svg" width={40} />}
        title="Page Title"
      />
    );
  };
  ```

  #### `Page`

  A page component that can be used to display a header and main content.

  ```tsx
  import { Panel } from '@bigcommerce/big-design';
  import { Page, Header } from '@bigcommerce/big-design-patterns';

  export const Component = () => {
    return (
      <Page
        background={{
          src: 'background.jpg',
        }}
        header={<Header {...} />}
        message={{
          header: 'Optional headline',
          type: 'info',
          messages: [
            { text: 'Required description copy.', link: { text: 'Optional link', href: '#' } },
          ],
        }}
      >
        <Panel header="Main content">
          ...
        </Panel>
      </Page>
    );
  };
  ```
