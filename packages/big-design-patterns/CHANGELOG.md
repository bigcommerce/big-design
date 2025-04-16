# @bigcommerce/big-design-patterns

## 2.1.0

### Minor Changes

- 775df8a: Created lozenge component to indicate feature lifecycle status

### Patch Changes

- 3ff3c7b: Overrides the consecutive button margins within the page header component. The flex wrapper should handle the gap between the buttons.
- Updated dependencies [775df8a]
- Updated dependencies [0c11db0]
  - @bigcommerce/big-design@1.8.0
  - @bigcommerce/big-design-icons@1.3.0

## 2.0.6

### Patch Changes

- Updated dependencies [98fbd46]
  - @bigcommerce/big-design-icons@1.2.2
  - @bigcommerce/big-design@1.7.1

## 2.0.5

### Patch Changes

- Updated dependencies [65f1431]
- Updated dependencies [5e0589f]
  - @bigcommerce/big-design@1.7.0

## 2.0.4

### Patch Changes

- Updated dependencies [69e7772]
  - @bigcommerce/big-design-icons@1.2.1
  - @bigcommerce/big-design@1.6.2

## 2.0.3

### Patch Changes

- cb84b19: Prevent the Header component from unnecessary re-renders and avoiding redundant updates
- Updated dependencies [0f8cf34]
  - @bigcommerce/big-design-icons@1.2.0
  - @bigcommerce/big-design@1.6.1

## 2.0.2

### Patch Changes

- Updated dependencies [1d0d843]
- Updated dependencies [1d0d843]
- Updated dependencies [14f3183]
  - @bigcommerce/big-design@1.6.0

## 2.0.1

### Patch Changes

- Updated dependencies [e860150]
  - @bigcommerce/big-design@1.5.0

## 2.0.0

### Patch Changes

- Updated dependencies [01a5b20]
  - @bigcommerce/big-design-icons@1.1.0
  - @bigcommerce/big-design@1.4.2

## 1.1.1

### Patch Changes

- eef4d38: Fix header wrapping on smaller screens
- 66bc0c8: Fixed page width definition to expand to the available area

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
