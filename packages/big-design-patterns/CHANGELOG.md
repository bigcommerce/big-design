# @bigcommerce/big-design-patterns

## 6.0.0

### Major Changes

- d737812: Require styled-components 6: the `styled-components` peer dependency range moves from `^5.3.5` to `^6.1.14` across all four packages. Consumers must upgrade to styled-components 6 to use this release (v6 supports both React 18 and, ahead of our upcoming React 19 flip, React 19 — while v5 does not support React 19). Along with the peer bump, the packages now build and test against styled-components `^6.4.0`, `@types/styled-components` is dropped (v6 ships its own types), and `jest-styled-components` moves to `^7.4.0` for v6 support (7.4.0 also fixes `toHaveStyleRule`'s `media` option against stylis v4's spaced media-query output). `createTheme()` now returns `keyframes` as a plain object copy rather than a frozen module-namespace object, since styled-components 6 deep-merges themes when folding `defaultProps` and a getter-only namespace object makes that merge throw; the shape and values of `theme.keyframes` are unchanged.

### Patch Changes

- a1ac68f: Finish the transient-props migration for prop leaks that only surface under styled-components 6 and that `jest-fail-on-console` cannot catch (React only warns on camelCase or boolean-valued unknown props, so all-lowercase string/object props leak silently): `$`-prefix `variant` (Lozenge, Modal, StatusMessage), `percent` (ProgressBar), `isInvalid`/`isSelected` (Worksheet RowStatus), `isValid` (FileUploader's `StyledFile`), and bare `ellipsis` passes to Typography internals (FeatureSet Tag, Tree TreeNode); destructure `actions` (Message, InlineMessage) and `text` (the `<StyledLink {...link}>` sites in Alert/Message/InlineMessage/Form Description, and Panel's action button) out of blind spreads; and replace `.attrs({ theme: defaultTheme })` with the repo-standard `defaultProps` assignment (FeatureSet, StatelessPagination, patterns' Page/Header/ActionBar) — on v6 the attrs object leaks `theme="[object Object]"` onto the DOM, and unlike `defaultProps` it also overrode `ThemeProvider` for those components. `Link` now also binds its forwarded ref, which v5's attribute filtering silently dropped, so `<Link ref>` attaches for the first time. Fixing the bare `ellipsis` passes also restores text truncation on Tree node labels and FeatureSet tags, which broke when Typography's styled internals moved to `$ellipsis` (the two internal call sites were missed, so the truncation CSS silently stopped applying). No public API change; aside from that restored truncation styling, DOM and CSS output on styled-components 5 are unchanged.
- 9107fa6: `$`-prefix `StyledPageBackground`'s `background` prop ahead of styled-components 6 (LTRAC-1396 follow-up). Public `PageProps.background` is unchanged.
- Updated dependencies [5d5322c]
- Updated dependencies [9d91895]
- Updated dependencies [6639ca2]
- Updated dependencies [a1ac68f]
- Updated dependencies [d737812]
- Updated dependencies [0608331]
- Updated dependencies [39f59f4]
- Updated dependencies [0aa3c04]
- Updated dependencies [15d44ac]
- Updated dependencies [e639408]
- Updated dependencies [a565ce3]
- Updated dependencies [c1b0390]
- Updated dependencies [4a7a8e7]
- Updated dependencies [9633080]
- Updated dependencies [8885756]
- Updated dependencies [a3d820e]
- Updated dependencies [3b92abf]
- Updated dependencies [f3c77e0]
- Updated dependencies [1c41421]
- Updated dependencies [847e43a]
- Updated dependencies [99f5684]
- Updated dependencies [5a45204]
- Updated dependencies [08002ed]
  - @bigcommerce/big-design@4.0.0
  - @bigcommerce/big-design-icons@2.0.0
  - @bigcommerce/big-design-theme@2.0.0

## 5.0.0

### Patch Changes

- Updated dependencies [de269fd]
- Updated dependencies [54b9cec]
  - @bigcommerce/big-design@3.0.0

## 4.0.0

### Patch Changes

- Updated dependencies [758f850]
- Updated dependencies [26a1dd0]
- Updated dependencies [a109a17]
  - @bigcommerce/big-design@2.1.0

## 3.0.1

### Patch Changes

- Updated dependencies [5a5c9b7]
  - @bigcommerce/big-design-icons@1.4.0
  - @bigcommerce/big-design@2.0.1

## 3.0.0

### Patch Changes

- Updated dependencies [9d73348]
- Updated dependencies [0d23a03]
- Updated dependencies [75fe92a]
- Updated dependencies [b78ce1b]
- Updated dependencies [a7bdf12]
  - @bigcommerce/big-design@2.0.0

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
