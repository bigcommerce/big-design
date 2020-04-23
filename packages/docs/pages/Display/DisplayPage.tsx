import { Box, H0, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview, NextLink } from '../../components';
import { DisplayPropTable } from '../../PropTables';

const DisplayPage = () => (
  <>
    <H0>Display</H0>

    <Text>
      A few of our components expose a <Code primary>display</Code> prop in order to change the CSS display property.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Box display="inline-block" backgroundColor="secondary20" border="box" padding="medium">
        Boxed content
      </Box>
      {/* jsx-to-string:end */}
    </CodePreview>

    <Text>
      It's also possible to use the prop with responsive{' '}
      <NextLink href="/Breakpoint/BreakpointPage" as="/breakpoints">
        breakpoints
      </NextLink>
      :
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <>
        <Box
          display={{ mobile: 'none', tablet: 'inline-block' }}
          backgroundColor="secondary20"
          border="box"
          padding="medium"
        >
          Boxed content hidden on mobile.
        </Box>
        <Box display={{ mobile: 'block', tablet: 'none' }} backgroundColor="primary10" border="box" padding="medium">
          Boxed content hidden on tablet.
        </Box>
      </>
      {/* jsx-to-string:end */}
    </CodePreview>

    <DisplayPropTable />
  </>
);

export default DisplayPage;
