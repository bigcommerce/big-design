const bdPkg = require('../big-design/package.json');

const pkg = require('./package.json');
const isProduction = process.env.NODE_ENV === 'production';
const isDev = !isProduction;
const URL_PREFIX = '/big-design';
const examplesVersion = pkg.devDependencies['@bigcommerce/examples'].replace('^', '');

module.exports = {
  assetPrefix: isProduction ? URL_PREFIX : '',
  env: {
    CODE_SANDBOX_URL: `https://codesandbox.io/s/github/bigcommerce/big-design/tree/%40bigcommerce/examples%40${examplesVersion}/packages/examples`,
    URL_PREFIX: isProduction ? URL_PREFIX : '',
    BD_VERSION: bdPkg.version,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [require.resolve('jsx-to-string-loader')],
    });

    return config;
  },
  exportPathMap: () => ({
    '/': { page: '/GettingStarted/GettingStartedPage' },
    '/alert': { page: '/Alert/AlertPage' },
    '/badge': { page: '/Badge/BadgePage' },
    '/box': { page: '/Box/BoxPage' },
    '/breakpoints': { page: '/Breakpoints/BreakpointsPage' },
    '/button': { page: '/Button/ButtonPage' },
    '/checkbox': { page: '/Checkbox/CheckboxPage' },
    '/collapse': { page: '/Collapse/CollapsePage' },
    '/counter': { page: '/Counter/CounterPage' },
    '/colors': { page: '/Colors/ColorsPage' },
    '/display': { page: '/Display/DisplayPage' },
    '/datepicker': { page: '/Datepicker/DatepickerPage' },
    '/dropdown': { page: '/Dropdown/DropdownPage' },
    '/flex': { page: '/Flex/FlexPage' },
    '/form': { page: '/Form/FormPage' },
    '/grid': { page: '/Grid/GridPage' },
    '/icons': { page: '/Icons/IconsPage' },
    '/inline-message': { page: '/InlineMessage/InlineMessagePage' },
    '/input': { page: '/Input/InputPage' },
    '/link': { page: '/Link/LinkPage' },
    '/margin': { page: '/Margin/MarginPage' },
    '/message': { page: '/Message/MessagePage' },
    '/modal': { page: '/Modal/ModalPage' },
    '/multi-select': { page: '/MultiSelect/MultiSelectPage' },
    '/padding': { page: '/Padding/PaddingPage' },
    '/pagination': { page: '/Pagination/PaginationPage' },
    '/panel': { page: '/Panel/PanelPage' },
    '/popover': { page: '/Popover/PopoverPage' },
    '/progress-bar': { page: '/Progress/ProgressBarPage' },
    '/progress-circle': { page: '/Progress/ProgressCirclePage' },
    '/radio': { page: '/Radio/RadioPage' },
    '/select': { page: '/Select/SelectPage' },
    '/spacing': { page: '/Spacing/SpacingPage' },
    '/statefulTable': { page: '/StatefulTable/StatefulTablePage' },
    '/statefulTree': { page: '/StatefulTree/StatefulTreePage' },
    '/stepper': { page: '/Stepper/StepperPage' },
    '/switch': { page: '/Switch/SwitchPage' },
    '/table': { page: '/Table/TablePage' },
    '/tabs': { page: '/Tabs/TabsPage' },
    '/textarea': { page: '/Textarea/TextareaPage' },
    '/timepicker': { page: '/Timepicker/TimepickerPage' },
    '/tooltip': { page: '/Tooltip/TooltipPage' },
    '/typography': { page: '/Typography/TypographyPage' },

    // Dev route for development purposes
    ...(isDev && { '/dev': { page: '/Dev/DevPage', query: { noNav: '' } } }),
  }),
};
