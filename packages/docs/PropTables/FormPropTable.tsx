import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

export const FormErrorPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="FormControlError" propList={[]} nativeElement={['p', 'all']} {...props} />
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
    description: 'Pass in a description to display in the fieldset. Will render nothing if not the correct type.',
  },
  {
    name: 'legend',
    types: ['string', 'FieldsetLegend'],
    description: 'Pass in a legend to display in the fieldset. Will render nothing if not the correct type.',
  },
];

export const FormFieldsetPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Fieldset" propList={formFieldsetProps} {...props} />
);

export const FormLabelPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="FormControlLabel" propList={[]} nativeElement={['label', 'all']} {...props} />
);

export const FormDescriptionPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="FormControlDescription" propList={[]} nativeElement={['p', 'all']} {...props} />
);

const formGroupProps: Prop[] = [
  {
    name: 'errors',
    types: ['React.ReactChild', 'React.ReactChild[]'],
    description: 'Pass error(s) into the form group to override child input errors.',
  },
];

export const FormPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Form" propList={formProps} nativeElement={['form', 'all']} {...props} />
);

export const FormGroupPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="FormGroup" propList={formGroupProps} {...props} />
);
