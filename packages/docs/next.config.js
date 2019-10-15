const isProduction = process.env.NODE_ENV === 'production';
const URL_PREFIX = '/big-design';

module.exports = {
  assetPrefix: isProduction ? URL_PREFIX : '',
  env: {
    URL_PREFIX: isProduction ? URL_PREFIX : '',
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [require.resolve('jsx-to-string-loader')],
    });

    return config;
  },
  exportPathMap: () => ({
    '/': { page: '/GettingStarted/GettingStartedPage' },
    '/badge': { page: '/Badge/BadgePage' },
    '/box': { page: '/Box/BoxPage' },
    '/breakpoints': { page: '/Breakpoints/BreakpointsPage' },
    '/button': { page: '/Button/ButtonPage' },
    '/checkbox': { page: '/Checkbox/CheckboxPage' },
    '/colors': { page: '/Colors/ColorsPage' },
    '/dropdown': { page: '/Dropdown/DropdownPage' },
    '/flex': { page: '/Flex/FlexPage' },
    '/form': { page: '/Form/FormPage' },
    '/grid': { page: '/Grid/GridPage' },
    '/icons': { page: '/Icons/IconsPage' },
    '/input': { page: '/Input/InputPage' },
    '/link': { page: '/Link/LinkPage' },
    '/margin': { page: '/Margin/MarginPage' },
    '/modal': { page: '/Modal/ModalPage' },
    '/padding': { page: '/Padding/PaddingPage' },
    '/pagination': { page: '/Pagination/PaginationPage' },
    '/panel': { page: '/Panel/PanelPage' },
    '/progress-bar': { page: '/Progress/ProgressBarPage' },
    '/progress-circle': { page: '/Progress/ProgressCirclePage' },
    '/radio': { page: '/Radio/RadioPage' },
    '/select': { page: '/Select/SelectPage' },
    '/spacing': { page: '/Spacing/SpacingPage' },
    '/table': { page: '/Table/TablePage' },
    '/tabs': { page: '/Tabs/TabsPage' },
    '/textarea': { page: '/Textarea/TextareaPage' },
    '/tooltip': { page: '/Tooltip/TooltipPage' },
    '/typography': { page: '/Typography/TypographyPage' },
  }),
};
