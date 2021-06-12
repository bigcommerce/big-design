import { Button, H1, Panel, Stepper, Tabs, Text } from '@bigcommerce/big-design';
import React, { useContext, useState } from 'react';

import { ActiveTabContext, Code, CodePreview } from '../../components';
import { StepperPropTable } from '../../PropTables';

const StepperPage = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return <StepperPropTable />;
      case 'examples':
      default:
        return (
          <Panel>
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
        );
    }
  };

  return (
    <>
      <H1>Stepper</H1>

      <Text>
        The <Code primary>Stepper</Code> component is used to display a set number of steps. Useful for guiding a user
        through a multi-step operation.
      </Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default StepperPage;
