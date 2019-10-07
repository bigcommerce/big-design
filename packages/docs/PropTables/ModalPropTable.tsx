import React from 'react';

import { Code, PropTable } from '../components';

export const ModalPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="actions" types="React.ReactNode">
      Sets the actions of the modal.
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
      Header title of the modal.
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
    <PropTable.Prop name="withHeaderBorder" types="boolean" defaults="false">
      Determines if the header bottom border is shown.
    </PropTable.Prop>
    <PropTable.Prop name="withActionsBorder" types="boolean" defaults="false">
      Determines if the actions top border is shown.
    </PropTable.Prop>
  </PropTable>
);
