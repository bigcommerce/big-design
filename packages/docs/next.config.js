module.exports = {
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
    '/button': { page: '/Button/ButtonPage' },
    '/colors': { page: '/Colors/ColorsPage' },
    '/dropdown': { page: '/Dropdown/DropdownPage' },
    '/flex': { page: '/Flex/FlexPage' },
    '/form': { page: '/Form/FormPage' },
    '/form/checkbox': { page: '/Form/CheckboxPage' },
    '/form/input': { page: '/Form/InputPage' },
    '/form/radio': { page: '/Form/RadioPage' },
    '/form/select': { page: '/Form/SelectPage' },
    '/form/textarea': { page: '/Form/TextareaPage' },
    '/grid': { page: '/Grid/GridPage' },
    '/icons': { page: '/Icons/IconsPage' },
    '/link': { page: '/Link/LinkPage' },
    '/modal': { page: '/Modal/ModalPage' },
    '/panel': { page: '/Panel/PanelPage' },
    '/progress/bar': { page: '/Progress/ProgressBarPage' },
    '/progress/circle': { page: '/Progress/ProgressCirclePage' },
    '/tabs': { page: '/Tabs/TabsPage' },
    '/tooltip': { page: '/Tooltip/TooltipPage' },
    '/typography': { page: '/Typography/TypographyPage' },
    '/utilities/margin': { page: '/Utilities/MarginPage' },
    '/utilities/padding': { page: '/Utilities/PaddingPage' },
  }),
};
