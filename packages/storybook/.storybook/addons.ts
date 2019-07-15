// Addons panel order is dictated by require order

/* tslint:disable:no-var-requires */

if (process.env.NODE_ENV !== 'production') {
  require('@storybook/addon-a11y/register');
  require('@storybook/addon-actions/register');
}

// TODO: Remove knobs addon when we port al stories to CodePreviewer
require('@storybook/addon-knobs/register');
require('@storybook/addon-backgrounds/register');
require('@storybook/addon-viewport/register');
