import { AccordionPanel, Alert, Badge, Box } from '@bigcommerce/big-design';
import React from 'react';

// import ClientComponent from './client-component';

export default function Page() {
  return (
    <>
      <AccordionPanel header="Test" panels={[]} />
      <Alert messages={[{ text: 'Test' }]} />
      <Badge label="Test" />
      <Box backgroundColor="brand" padding="large" />
    </>
  );
}
