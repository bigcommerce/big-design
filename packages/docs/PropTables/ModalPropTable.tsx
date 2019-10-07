import React from 'react';

import { Code, NextLink, PropTable } from '../components';

export const ModalPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="actions" types="object[]">
      Accepts an array of objects with <NextLink href="/button">Button</NextLink> props and a <Code>text</Code> label.
    </PropTable.Prop>
    <PropTable.Prop name="backdrop" types="boolean" defaults="true">
      Determines if the backdrop is shown.
    </PropTable.Prop>
    <PropTable.Prop name="closeOnClickOutside" types="boolean" defaults="false">
      Controls whether <Code>onClose</Code> is called when clicking outside of the modal.
    </PropTable.Prop>
    <PropTable.Prop name="closeOnEscKey" types="boolean" defaults="true">
      Controls whether <Code>onClose</Code> is called when pressing the ESC key.
    </PropTable.Prop>
    <PropTable.Prop name="header" types="string">
      Sets visible text that describes the content of the modal.
    </PropTable.Prop>
    <PropTable.Prop name="isOpen" types="boolean" required>
      Determines if the modal/dialog is open.
    </PropTable.Prop>
    <PropTable.Prop name="onClose" types="() => void" required>
      Function that will be called on close events.
    </PropTable.Prop>
    <PropTable.Prop name="variant" types={['modal', 'dialog']} defaults="modal">
      Determines the modal variant.
    </PropTable.Prop>
  </PropTable>
);
