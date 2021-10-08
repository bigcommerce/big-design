import { Button, H1, Panel, Stepper, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, List } from '../components';
import { StepperPropTable } from '../PropTables';

const StepperPage = () => {
  return (
    <>
      <H1>Stepper</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Stepper</Code> is used to display the progress of a particular process through numbered steps to
          keep the user on track and increase the percentage of completeness.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>To guide users through a complex flow which needs multiple(3-5) steps.</List.Item>
          <List.Item>
            When dealing with a complex process which can't be easily completed and benefits from dividing it into
            smaller distinct steps.
          </List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
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

      <Panel header="Props" headerId="props">
        <StepperPropTable renderPanel={false} />
      </Panel>
    </>
  );
};

export default StepperPage;
