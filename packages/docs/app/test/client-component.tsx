'use client';

import { AccordionPanel, useAccordionPanel } from '@bigcommerce/big-design';
import React from 'react';

export default function ClientComponent() {
  const { panels } = useAccordionPanel([]);

  return <AccordionPanel header="Test" panels={panels} />;
}
