import { H1, Panel, Switch, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { CodePreview, PageNavigation } from '../../components';
import { SwitchPropTable } from '../../PropTables';

const SwitchPage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <Panel>
          <Text>
            Switches are intended for toggling actions that have an immediate effect and don't require saving. Therefore
            it is not appropriate to use a Switch in a form.
          </Text>
          <CodePreview>
            {/* jsx-to-string:start */}
            {function Example() {
              const [checked, setChecked] = useState(false);
              const handleChange = () => setChecked(!checked);

              return <Switch checked={checked} onChange={handleChange} />;
            }}
            {/* jsx-to-string:end */}
          </CodePreview>
        </Panel>
      ),
    },
    {
      id: 'code',
      title: 'Code',
      render: () => <SwitchPropTable />,
    },
  ];

  return (
    <>
      <H1>Switch</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default SwitchPage;
