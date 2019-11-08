import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const linkProps: Prop[] = [
  {
    name: 'external',
    types: 'boolean',
    description: (
      <>
        Shows and external icons When the <Code primary>external</Code> flag is set and target="_blank".
      </>
    ),
  },
];

export const LinkPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Link" propList={linkProps} {...props} />
);
