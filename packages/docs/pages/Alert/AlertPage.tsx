import { Alert, H0, H1, H2, Link, Text } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview } from '../../components';
import { AlertPropTable, MarginPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Alerts</H0>

    <Text>
      The alert component is user to contain response to an action, status of an operation, informative messages.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Alert
        marginBottom="large"
        header="Your catalog import is complete."
        variant="success"
        onCloseButtonClick={() => null}
      >
        <Text>
          You may now view your catalog. <Link href="#">View catalog</Link>
        </Text>
      </Alert>
      {/* jsx-to-string:end */}
    </CodePreview>

    <Text>You could also use alert component without close button</Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Alert header="Your catalog import is complete.">
        <Text>
          You may now view your catalog. <Link href="#">View catalog</Link>
        </Text>
      </Alert>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>
    <AlertPropTable />

    <h1>Variants</h1>
    <CodePreview>
      {/* jsx-to-string:start */}
      <>
        <Alert
          marginBottom="large"
          header="Your catalog import is complete."
          variant="primary"
          onCloseButtonClick={() => null}
        >
          <Text>
            You may now view your catalog. <Link href="#">View catalog</Link>
          </Text>
        </Alert>
        <Alert
          marginBottom="large"
          header="Your catalog import is complete."
          variant="danger"
          onCloseButtonClick={() => null}
        >
          <Text>
            You may now view your catalog. <Link href="#">View catalog</Link>
          </Text>
        </Alert>
        <Alert
          marginBottom="large"
          header="Your catalog import is complete."
          variant="success"
          onCloseButtonClick={() => null}
        >
          <Text>
            You may now view your catalog. <Link href="#">View catalog</Link>
          </Text>
        </Alert>
        <Alert
          marginBottom="large"
          header="Your catalog import is complete."
          variant="warning"
          onCloseButtonClick={() => null}
        >
          <Text>
            You may now view your catalog. <Link href="#">View catalog</Link>
          </Text>
        </Alert>
      </>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Inherited Props</H2>
    <MarginPropTable collapsible />
  </>
);
