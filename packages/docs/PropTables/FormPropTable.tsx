import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

export const FormErrorPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable nativeElement={['p', 'all']} propList={[]} title="FormControlError" {...props} />
);

const formProps: Prop[] = [
  {
    name: 'fullWidth',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Sets the form width to 100%',
  },
];

const formFieldsetProps: Prop[] = [
  {
    name: 'description',
    types: ['string', 'FieldsetDescription'],
    description:
      'Pass in a description to display in the fieldset. Will render nothing if not the correct type.',
  },
  {
    name: 'legend',
    types: ['string', 'FieldsetLegend'],
    description:
      'Pass in a legend to display in the fieldset. Will render nothing if not the correct type.',
  },
];

export const FormFieldsetPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={formFieldsetProps} title="Fieldset" {...props} />
);

const formLabelProps: Prop[] = [
  {
    name: 'renderRequired',
    types: 'boolean',
    description: 'Shows required asterisk.',
  },
  {
    name: 'localization',
    types: '{ optional: string }',
    description: 'Overrides the label with localized text.',
  },
];

export const FormLabelPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable
    nativeElement={['label', 'all']}
    propList={formLabelProps}
    title="FormControlLabel"
    {...props}
  />
);

export const FormDescriptionPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable nativeElement={['p', 'all']} propList={[]} title="FormControlDescription" {...props} />
);

const formGroupProps: Prop[] = [
  {
    name: 'errors',
    types: ['React.ReactChild', 'React.ReactChild[]'],
    description: 'Pass error(s) into the form group to override child input errors.',
  },
];

export const FormPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable nativeElement={['form', 'all']} propList={formProps} title="Form" {...props} />
);

export const FormGroupPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={formGroupProps} title="FormGroup" {...props} />
);
