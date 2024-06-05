# Page Structure

This document defines the overall page structure of each documentation page.

```jsx
import { H0, H1, H2, Link, Text } from '@bigcommerce/big-design';

import { CodePreview, CodeSnippet, Collapsible } from '../../components';

<H0>Headings</H0>

<Text>
  Intro text.
  <Link href="https://developer.bigcommerce.com/big-design" target="_blank">Design Guidelines</Link>.
</Text>

<CodePreview>
  Example usage with default props
</CodePreview>

<H1>API</H1>

<H2>Component Name</H2>

<ImportedPropTable />

<H2>Static Member</H2>

<ImportedStaticMemberPropTable />

<H2>Inherited Props</H2>

<Collapsible title="Inherited Props">
  <InheritedPropTable />
</Collapsible>

<H1>Examples</H1>

<H2>Example 1</H2>

<CodePreview></CodePreview> || <CodeSnippet></CodeSnippet>

<H2>Example 2</H2>

<CodePreview></CodePreview> || <CodeSnippet></CodeSnippet>

```
