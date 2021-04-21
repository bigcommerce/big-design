import { ButtonGroup, H0, H1, H2, Text } from '@bigcommerce/big-design';
import {
  AssignmentIcon,
  DeleteIcon,
  EditIcon,
  FileCopyIcon,
  MoreHorizIcon,
  OpenInNewIcon,
} from '@bigcommerce/big-design-icons';
import React from 'react';

import { Code, CodePreview } from '../../components';
import {
  ButtonGroupDropdownItemPropTable,
  ButtonGroupItemPropTable,
  ButtonGroupPropTable,
  MarginPropTable,
} from '../../PropTables';

const ButtonGroupPage = () => (
  <>
    <H0>Button Group</H0>

    <Text>
      The <Code primary>Button Group</Code> component is used for grouping actions like: <Code primary>Button</Code>,{' '}
      <Code primary>Dropdown</Code>
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <ButtonGroup
        items={[
          { content: 'Button' },
          { content: 'Button' },
          { content: 'Button' },
          {
            items: [
              { content: 'Edit', onItemClick: (item) => item, hash: 'edit', icon: <EditIcon /> },
              {
                content: 'Duplicate',
                onItemClick: (item) => item,
                hash: 'duplicate',
                icon: <FileCopyIcon />,
              },
              {
                content: 'Copy',
                onItemClick: (item) => item,
                hash: 'copy',
                icon: <AssignmentIcon />,
                disabled: true,
                tooltip: 'You cannot copy this item...',
              },
              {
                content: 'Delete',
                onItemClick: (item) => item,
                hash: 'delete',
                icon: <DeleteIcon />,
                actionType: 'destructive',
              },
              {
                content: 'Link',
                icon: <OpenInNewIcon />,
                type: 'link',
                url: '#',
              },
            ],
            maxHeight: 250,
            placement: 'bottom-start',
            toggle: {
              content: <MoreHorizIcon />,
            },
          },
        ]}
      />
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>
    <ButtonGroupPropTable />
    <ButtonGroupItemPropTable id="button-group-item-prop-table" />
    <ButtonGroupDropdownItemPropTable id="button-group-dropdown-item-prop-table" />

    <H2>Inherited Props</H2>
    <MarginPropTable collapsible />
  </>
);

export default ButtonGroupPage;
