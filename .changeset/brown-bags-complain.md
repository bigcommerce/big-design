---
'@bigcommerce/big-design-patterns': major
---

Releases `@bigcommerce/big-design-pattern`, a collections of useful patterns for BigDesign.

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
