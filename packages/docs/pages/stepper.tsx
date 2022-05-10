import { Button, H1, Panel, Stepper, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, GuidelinesTable, List } from '../components';
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
        <StepperPropTable />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          recommended={[
            'Should be placed directly below the page header at the top of the page and left aligned with the panel below.',
            'Display the steps in order from left to right.',
            'Only have a single step per page.',
            'Aim for 3-5 steps, if a process requires more than 5 steps, consider simplifying the process or break it down into multi-tasks.',
            'Use step labels to describe the purpose of the steps and recommend using short sentences of 2-3 words.',
            'Strongly recommend content should only be saved/created at the end of flow and it should be explictly called out when it’s saved/created.',
            'Each step needs be completed before proceeding to the next one.',
            'Always allow the user to go back to the previous step.',
          ]}
          discouraged={[
            <>
              Don’t use multiple <Code primary>Steppers</Code> on one page.
            </>,
            'Don’t use long step labels.',
            "Don’t add/modify number of steps dynamically. Number of steps shouldn't change mid-way through the flow due to what the user selected.",
          ]}
        />
      </Panel>
    </>
  );
};

export default StepperPage;
