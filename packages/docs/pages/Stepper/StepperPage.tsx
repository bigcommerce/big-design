import { Button, H1, Panel, Stepper, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, PageNavigation } from '../../components';
import { StepperPropTable } from '../../PropTables';

const StepperPage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <Panel>
          <Text>
            The <Code primary>Stepper</Code> component is used to display a set number of steps. Useful for guiding a
            user through a multi-step operation.
          </Text>
          <CodePreview>
            {/* jsx-to-string:start */}
            {function Example() {
              const steps = ['Connect your Account', 'Configure your Settings', 'Sync your Products'];
              const [currentStep, setCurrentStep] = useState(0);

              return (
                <>
                  <Stepper steps={steps} currentStep={currentStep} />
                  <Button onClick={() => setCurrentStep(0)} disabled={currentStep === 0}>
                    Reset
                  </Button>
                  <Button onClick={() => setCurrentStep(currentStep + 1)} disabled={currentStep === steps.length - 1}>
                    Next
                  </Button>
                </>
              );
            }}
            {/* jsx-to-string:end */}
          </CodePreview>
        </Panel>
      ),
    },
    {
      id: 'code',
      title: 'Code',
      render: () => <StepperPropTable />,
    },
  ];

  return (
    <>
      <H1>Stepper</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default StepperPage;
