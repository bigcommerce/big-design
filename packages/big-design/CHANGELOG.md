# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.20.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.19.2...@bigcommerce/big-design@0.20.0) (2020-06-16)


### Features

* **component:** add additional size to ProgressCircle component ([#409](https://github.com/bigcommerce/big-design/issues/409)) ([70fafaf](https://github.com/bigcommerce/big-design/commit/70fafaf5e9b61a408e97d72a24a5b88567482b33))
* **component:** add Tree component ([#406](https://github.com/bigcommerce/big-design/issues/406)) ([c67643c](https://github.com/bigcommerce/big-design/commit/c67643cfdf425d078a1ea09bce12575e35f442e7))


### BREAKING CHANGES

* **component:** `xSmall` `ProgressCircle` size changed to `xxSmall`.





## [0.19.2](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.19.1...@bigcommerce/big-design@0.19.2) (2020-05-07)


### Bug Fixes

* lock downshift to 5.2.0 to fix behavior of onOptionChange ([#398](https://github.com/bigcommerce/big-design/issues/398)) ([ce73376](https://github.com/bigcommerce/big-design/commit/ce73376e2548137ace47e8b1a1513d2e92f287f5))





## [0.19.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.19.0...@bigcommerce/big-design@0.19.1) (2020-04-30)


### Bug Fixes

* type regression for ts < 3.8 ([#395](https://github.com/bigcommerce/big-design/issues/395)) ([f476f9b](https://github.com/bigcommerce/big-design/commit/f476f9b3c2a950bb3bd3353a4ce180e994e465c0))





# [0.19.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.18.0...@bigcommerce/big-design@0.19.0) (2020-04-29)


### Bug Fixes

* **component:** adds description to Select & MultiSelect ([#378](https://github.com/bigcommerce/big-design/issues/378)) ([b66c733](https://github.com/bigcommerce/big-design/commit/b66c733a418afdbce36c8c683a59f69a17dda1d0))
* **component:** change scroll behavior to auto ([#379](https://github.com/bigcommerce/big-design/issues/379)) ([07afc3e](https://github.com/bigcommerce/big-design/commit/07afc3eff39905147ee54c4b88d51bb97e0cbfc5))
* **component:** improve Dropdown & MultiSelect component performance ([#391](https://github.com/bigcommerce/big-design/issues/391)) ([659cada](https://github.com/bigcommerce/big-design/commit/659cada17051564cc3a6a360078600a5dce2ca05))
* **component:** improves Select component performance ([#390](https://github.com/bigcommerce/big-design/issues/390)) ([699b897](https://github.com/bigcommerce/big-design/commit/699b89783febb5b0495207e9dddd0ddcce15011c))
* **component:** prevent select from selecting option when blurring ([#392](https://github.com/bigcommerce/big-design/issues/392)) ([d8410a1](https://github.com/bigcommerce/big-design/commit/d8410a1d6031c429e74e95edd051c6a635e6041d))
* **component:** remove bottom margin on the TableFigure component ([#385](https://github.com/bigcommerce/big-design/issues/385)) ([25d4760](https://github.com/bigcommerce/big-design/commit/25d47609787954e1da7de6deac41707e697c4bfc))
* **component:** table column prop  incorrect value for middle alignment ([#383](https://github.com/bigcommerce/big-design/issues/383)) ([cb1eadb](https://github.com/bigcommerce/big-design/commit/cb1eadb7c501515b18fd93b792641eb5f286411d))


### Features

* **component:** add clearfix prop for Box component ([#381](https://github.com/bigcommerce/big-design/issues/381)) ([29b073b](https://github.com/bigcommerce/big-design/commit/29b073ba523429e8c1c04c7e4b02a4c88ff11b69))
* **component:** add Collapse component ([#368](https://github.com/bigcommerce/big-design/issues/368)) ([233e6d1](https://github.com/bigcommerce/big-design/commit/233e6d17f3216179991619ccecb9b1027600818b))


### BREAKING CHANGES

* **component:** Visual breaking change; removes the bottom margin on `TableFigure` components.
Use the built in `margin` props if margin is needed.





# [0.18.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.17.2...@bigcommerce/big-design@0.18.0) (2020-04-20)


### Bug Fixes

* **icons:** contained aria-labelledby when title prop was undefined ([#374](https://github.com/bigcommerce/big-design/issues/374)) ([f0d4df7](https://github.com/bigcommerce/big-design/commit/f0d4df70894b364ec932dfc5c62cebda5dd10bda))


### Features

* **component:** adds Counter component to bigdesign ([#371](https://github.com/bigcommerce/big-design/issues/371)) ([cff133e](https://github.com/bigcommerce/big-design/commit/cff133ed83eee42a67cb4a6e3d928d1688027ba2))





## [0.17.2](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.17.1...@bigcommerce/big-design@0.17.2) (2020-04-13)


### Bug Fixes

* add extra options for maxHeight examples and set up tests ([#367](https://github.com/bigcommerce/big-design/issues/367)) ([05f6aca](https://github.com/bigcommerce/big-design/commit/05f6aca5043c738d6f0714f23b94cee0dcd8dbf7))
* autocomplete=no only set for Selects ([#362](https://github.com/bigcommerce/big-design/issues/362)) ([ace0bf4](https://github.com/bigcommerce/big-design/commit/ace0bf4df04e08905675826fa990549cbb798be4))
* render new options for Selects when option prop changes ([#366](https://github.com/bigcommerce/big-design/issues/366)) ([72f066c](https://github.com/bigcommerce/big-design/commit/72f066ccf6a546ce1b20343c16693611cad2d5fd))
* **component:** expose FormProps ([#369](https://github.com/bigcommerce/big-design/issues/369)) ([358f25f](https://github.com/bigcommerce/big-design/commit/358f25f48db47ca9a8f31b31327a39f456f97f4d))
* **component:** modal focus first focusable element ([#365](https://github.com/bigcommerce/big-design/issues/365)) ([2c240a5](https://github.com/bigcommerce/big-design/commit/2c240a50d988301eb2b47745edd79d0a209a166c))


### Features

* **component:** CHP-6188 adds grouping options to Select component ([#350](https://github.com/bigcommerce/big-design/issues/350)) ([16a8dd7](https://github.com/bigcommerce/big-design/commit/16a8dd763099a6de84f8d7a6b904fb539c50d364))
* **component:** CHP-6225 adds ability to hide individual table headers ([#359](https://github.com/bigcommerce/big-design/issues/359)) ([b61b486](https://github.com/bigcommerce/big-design/commit/b61b486fd683bbaec443ce578dbebc5f338d10b9))





## [0.17.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.17.0...@bigcommerce/big-design@0.17.1) (2020-03-25)


### Bug Fixes

* **component:** pagination avoid page 0 ([#354](https://github.com/bigcommerce/big-design/issues/354)) ([ace346b](https://github.com/bigcommerce/big-design/commit/ace346b32c13950912e2b806c6e5497b1af36719))





# [0.17.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.16.0...@bigcommerce/big-design@0.17.0) (2020-03-25)


### Bug Fixes

* **component:** compute selectedItems on StatefulTable when items change ([#351](https://github.com/bigcommerce/big-design/issues/351)) ([b5b736b](https://github.com/bigcommerce/big-design/commit/b5b736badd0ad39b2b252a0f6f481203464d1e32))


### Features

* **component:** add description attribute for Checkbox ([#349](https://github.com/bigcommerce/big-design/issues/349)) ([9a9eeb4](https://github.com/bigcommerce/big-design/commit/9a9eeb4a8d0a316bc8dec0f1c9971efca5d86983))
* **component:** add description attribute for Radio ([#345](https://github.com/bigcommerce/big-design/issues/345)) ([42365e9](https://github.com/bigcommerce/big-design/commit/42365e9d1b6ce57dd2ff963bcfd93c2ae9caa54c))
* **component:** allow null errors on Select and MultiSelect ([7112dd3](https://github.com/bigcommerce/big-design/commit/7112dd3320639e404a13485b59549f48fa681a83))
* **component:** button and input icon props accept null ([e624879](https://github.com/bigcommerce/big-design/commit/e624879ceba179f1aa30cba3908d224da8d21068))
* **component:** stateful table sortFn ([#353](https://github.com/bigcommerce/big-design/issues/353)) ([3a715a3](https://github.com/bigcommerce/big-design/commit/3a715a3b4585ca6a620447d27f645dcedb51fc59))





# [0.16.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.15.0...@bigcommerce/big-design@0.16.0) (2020-02-21)


### Bug Fixes

* **component:** proper panel action button width ([#342](https://github.com/bigcommerce/big-design/issues/342)) ([e53400d](https://github.com/bigcommerce/big-design/commit/e53400d7410e1415ad0d886db72756502e4336ad))


### Features

* **component:** add Alerts, InlineAlerts, and Message components ([#340](https://github.com/bigcommerce/big-design/issues/340)) ([d541276](https://github.com/bigcommerce/big-design/commit/d54127603fba47b46cb35c3db4caf53ab24bafc3))
* **component:** bump scroll-into-view-if-needed and use auto behavior ([#334](https://github.com/bigcommerce/big-design/issues/334)) ([5bb0fdf](https://github.com/bigcommerce/big-design/commit/5bb0fdf5db15bfbadeb540733310158c1aaeb024))
* **component:** convert Dropdown/Select to FC and add MultiSelect ([#303](https://github.com/bigcommerce/big-design/issues/303)) ([0ab0e50](https://github.com/bigcommerce/big-design/commit/0ab0e50878405e3da18fbf4e6dc934539a0d6446))
* **component:** ensure Badge label prop is of type string ([#341](https://github.com/bigcommerce/big-design/issues/341)) ([a9b6847](https://github.com/bigcommerce/big-design/commit/a9b6847e4888f15f9e372a62e43b7542ecf65dfb))
* **component:** restrict badges to use label props and style fixes ([#339](https://github.com/bigcommerce/big-design/issues/339)) ([a8af2f2](https://github.com/bigcommerce/big-design/commit/a8af2f2a122404046fa2d5762cf4dceac34476f9))


### BREAKING CHANGES

* **component:** `Selects` and `Multiselects` have been split into its own component. Props changed for `Dropdowns` & `Selects`.

** Dropdown **

Old:
```jsx
<Dropdown
    maxHeight={250}
    options={[
        { content: 'Edit', onClick: item => item, icon: <EditIcon />, value: 'edit' },
        {
        content: 'Duplicate',
        onClick: item => item,
        value: 'duplicate',
        icon: <FileCopyIcon />,
        },
        {
        content: 'Copy',
        onClick: item => item,
        value: 'copy',
        icon: <AssignmentIcon />,
        disabled: true,
        tooltip: 'You cannot copy this item...',
        },
        {
        content: 'Delete',
        onClick: item => item,
        value: 'delete',
        icon: <DeleteIcon />,
        actionType: 'destructive',
        },
        {
        content: 'Link',
        icon: <OpenInNewIcon />,
        type: 'link',
        url: '#',
        },
    ]}
    placement="bottom-start"
    trigger={<Button>Open Menu</Button>}
/>
```

New:
```jsx
<Dropdown
    maxHeight={250}
    items={[
        { content: 'Edit', onItemClick: item => item, hash: 'edit', icon: <EditIcon /> },
        {
        content: 'Duplicate',
        onItemClick: item => item,
        hash: 'duplicate',
        icon: <FileCopyIcon />,
        },
        {
        content: 'Copy',
        onItemClick: item => item,
        hash: 'copy',
        icon: <AssignmentIcon />,
        disabled: true,
        tooltip: 'You cannot copy this item...',
        },
        {
        content: 'Delete',
        onItemClick: item => item,
        hash: 'delete',
        icon: <DeleteIcon />,
        actionType: 'destructive',
        },
        {
        content: 'Link',
        icon: <OpenInNewIcon />,
        type: 'link',
        url: '#',
        },
    ]}
    placement="bottom-start"
    toggle={<Button>Open Menu</Button>}
/>
```

** Select **

Old:
```jsx
<Select
    action={{
        actionType: 'destructive',
        content: 'Remove Country',
        icon: <DeleteIcon />,
        onClick: () => null,
    }}
    label="Countries"
    maxHeight={300}
    onChange={handleChange}
    options={[
        { value: 'us', content: 'United States' },
        { value: 'mx', content: 'Mexico' },
        { value: 'ca', content: 'Canada' },
        { value: 'ru', content: 'Russia', disabled: true },
    ]}
    placeholder={'Choose country'}
    placement={'bottom-start'}
    required
    value={value}
/>
```

New:
```jsx
<Select
    action={{
        actionType: 'destructive',
        content: 'Remove Country',
        icon: <DeleteIcon />,
        onActionClick: () => null,
    }}
    label="Countries"
    maxHeight={300}
    onOptionChange={handleChange}
    options={[
        { value: 'us', content: 'United States' },
        { value: 'mx', content: 'Mexico' },
        { value: 'ca', content: 'Canada' },
        { value: 'ru', content: 'Russia', disabled: true },
    ]}
    placeholder={'Choose country'}
    placement={'bottom-start'}
    required
    value={value}
/>
```

** MultiSelect ** 

Old:
```jsx
<Select
    action={{
        actionType: 'destructive',
        content: 'Remove Country',
        icon: <DeleteIcon />,
        onClick: () => null,
    }}
    label="Countries"
    maxHeight={300}
    multi={true}
    onChange={handleChange}
    options={[
        { value: 'us', content: 'United States' },
        { value: 'mx', content: 'Mexico' },
        { value: 'ca', content: 'Canada' },
        { value: 'ru', content: 'Russia', disabled: true },
    ]}
    placeholder={'Choose country'}
    placement={'bottom-start'}
    required
    value={value}
/>
```

New:
```jsx
<MultiSelect
    action={{
        actionType: 'destructive' as 'destructive',
        content: 'Remove Country',
        icon: <DeleteIcon />,
        onActionClick: () => null,
    }}
    filterable={true}
    label="Countries"
    maxHeight={300}
    onOptionsChange={handleChange}
    options={[
        { value: 'us', content: 'United States' },
        { value: 'mx', content: 'Mexico' },
        { value: 'ca', content: 'Canada' },
        { value: 'ru', content: 'England' },
    ]}
    placeholder={'Choose country'}
    placement={'bottom-start'}
    required
    value={value}
/>
```
* **component:** Convert `<Badge>label</Badge>` to `<Badge label="label" />`.





# [0.15.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.14.0...@bigcommerce/big-design@0.15.0) (2020-02-06)


### Bug Fixes

* **component:** add flex-shrink 0 to external link icon ([#305](https://github.com/bigcommerce/big-design/issues/305)) ([7b90f96](https://github.com/bigcommerce/big-design/commit/7b90f9688f9c1b391a5174b87eff063dc9d77f06))
* add react-hooks eslint and fix missing deps/issues ([#330](https://github.com/bigcommerce/big-design/issues/330)) ([da3fbd6](https://github.com/bigcommerce/big-design/commit/da3fbd68181e98e43a95de7fce9956be91afc9b8))
* **component:** fix links in Dropdown items and scroll bug ([#332](https://github.com/bigcommerce/big-design/issues/332)) ([98d8bdd](https://github.com/bigcommerce/big-design/commit/98d8bdde54a1eac827681b77fb0f2e7933a435bb))
* **component:** icon alignment and autofill input fixes ([#327](https://github.com/bigcommerce/big-design/issues/327)) ([d83d376](https://github.com/bigcommerce/big-design/commit/d83d3768b522683fe06b415b686f9f58ce788c0b))
* **component:** modal crash with no focusable elements ([#311](https://github.com/bigcommerce/big-design/issues/311)) ([72f4a33](https://github.com/bigcommerce/big-design/commit/72f4a33a9e507078ad6589487436d810728dc328))
* **component:** unmount Modals appropriately by deactivating focus trap ([#331](https://github.com/bigcommerce/big-design/issues/331)) ([346331c](https://github.com/bigcommerce/big-design/commit/346331c6dd4610ac0dade647b217ce3cdc87f82a))


### Features

* **component:** add ellipsis prop to Link ([#310](https://github.com/bigcommerce/big-design/issues/310)) ([c2f9b78](https://github.com/bigcommerce/big-design/commit/c2f9b78ef39a8ce39da8de2418328b77dc7c402b))
* **component:** add forwardRef to box, flex and grid ([#329](https://github.com/bigcommerce/big-design/issues/329)) ([b680e73](https://github.com/bigcommerce/big-design/commit/b680e735509de41a523d121da811cbaf2e5eb17c))
* **component:** add hidden headers props to Table and StatefulTable ([#297](https://github.com/bigcommerce/big-design/issues/297)) ([d80641a](https://github.com/bigcommerce/big-design/commit/d80641aa9a53ea55ed52671fa7d3f8b5eab26796))
* **component:** add label id's to form fields ([#304](https://github.com/bigcommerce/big-design/issues/304)) ([0620612](https://github.com/bigcommerce/big-design/commit/06206120d9e510a89a4298cfafde582710d4f3db))
* **component:** add text-transform props to Text and Small ([#307](https://github.com/bigcommerce/big-design/issues/307)) ([5d12784](https://github.com/bigcommerce/big-design/commit/5d127844504a71411b01b21c650e573648cff152))
* **component:** convert Checkbox to FC and remove static members ([#322](https://github.com/bigcommerce/big-design/issues/322)) ([b916d05](https://github.com/bigcommerce/big-design/commit/b916d057b3751f26ca71a531ea450e28faef4ca4))
* **component:** convert Flex to FC and export FlexItem ([#313](https://github.com/bigcommerce/big-design/issues/313)) ([b2d0f21](https://github.com/bigcommerce/big-design/commit/b2d0f21787ea292cd846fd29018cefd08b89b084))
* **component:** convert Form to FC and remove static members ([#324](https://github.com/bigcommerce/big-design/issues/324)) ([fbc5eb9](https://github.com/bigcommerce/big-design/commit/fbc5eb9ae8fac599b89df7c45e7d9f0307f9cc12))
* **component:** convert Grid to FC and export GridItem ([#314](https://github.com/bigcommerce/big-design/issues/314)) ([6e60254](https://github.com/bigcommerce/big-design/commit/6e60254226f084c9d77b97e27bbbff657f409f98))
* **component:** convert Input to FC and remove static members ([#320](https://github.com/bigcommerce/big-design/issues/320)) ([f8fcd86](https://github.com/bigcommerce/big-design/commit/f8fcd869295b5d6b4df3ebc2d2e240a9f7c7934d))
* **component:** convert Modal to FC ([#317](https://github.com/bigcommerce/big-design/issues/317)) ([a525e59](https://github.com/bigcommerce/big-design/commit/a525e59d66bf81a94832ba3e124b3df42772caa1))
* **component:** convert ProgressBar to FC ([#315](https://github.com/bigcommerce/big-design/issues/315)) ([b6f09c3](https://github.com/bigcommerce/big-design/commit/b6f09c39b050350ddd65fdb55db9335ac870cf45))
* **component:** convert ProgressCircle to FC ([#316](https://github.com/bigcommerce/big-design/issues/316)) ([fbc0e74](https://github.com/bigcommerce/big-design/commit/fbc0e74f5308d0590130c26e25c2f6743e89e87e))
* **component:** convert Radio to FC and remove static members ([#323](https://github.com/bigcommerce/big-design/issues/323)) ([b14a6c1](https://github.com/bigcommerce/big-design/commit/b14a6c1fd1090996bfbd6157327c9326accf1abb))
* **component:** convert Textarea to FC and remove static members ([#321](https://github.com/bigcommerce/big-design/issues/321)) ([bd9cc8d](https://github.com/bigcommerce/big-design/commit/bd9cc8d4a5d59b17873e93e8cab6c5f2eb152d77))
* **component:** convert Tooltip to FC and remove static members ([#326](https://github.com/bigcommerce/big-design/issues/326)) ([9215816](https://github.com/bigcommerce/big-design/commit/9215816247581a3945116f6d67cc75c553af1cb4))
* **component:** covert Fieldset to FC and remove static members ([#319](https://github.com/bigcommerce/big-design/issues/319)) ([f75bd49](https://github.com/bigcommerce/big-design/commit/f75bd49dd53d5286ea5a1cb03562a47331d38db1))
* **component:** rename and expose form controls ([#318](https://github.com/bigcommerce/big-design/issues/318)) ([48dea0c](https://github.com/bigcommerce/big-design/commit/48dea0cf141fe88ed14f24ff6b4d63fad7da71b0))
* **icons:** forwardRef to svg ([#312](https://github.com/bigcommerce/big-design/issues/312)) ([0088444](https://github.com/bigcommerce/big-design/commit/0088444015df4f6538d97e657f800f5718c2706e))


### BREAKING CHANGES

* **component:** Use `FormControlError`, `FormControlLabel`, `FormGroup`, and `Fieldset`
instead of `Form.Error`, `Form.Label`, `Form.Group`, and `Form.Fieldset` respectively.
* **component:** Use `RadioLabel` instead of `Radio.Label`.
* **component:** Use `CheckboxLabel` instead of `Checkbox.Label`.
* **component:** Use `FormControlDescription`, `FormControlError`, and `FormControlLabel`
instead of `Textarea.Description`, `Textarea.Error`, and `Textarea.Label` respectively.
* **component:** Use `FormControlDescription`, `FormControlError`, and `FormControlLabel`
instead of `Input.Description`, `Input.Error`, and `Input.Label` respectively.
* **component:** `Form.Fieldset` renamed to `Fieldset` and will now have to
`import { Fieldset } from '@bigcommerce/big-design';`
* **component:** `Grid.Item` renamed to `GridItem` and will now have to
import { GridItem } from '@bigcommerce/big-design';
* **component:** `Flex.Item` renamed to `FlexItem` and will now have to
import { FlexItem } from '@bigcommerce/big-design';





# [0.14.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.13.2...@bigcommerce/big-design@0.14.0) (2019-12-09)


### Bug Fixes

* **component:** disabled state styles for radio and checkbox ([#296](https://github.com/bigcommerce/big-design/issues/296)) ([72589a6](https://github.com/bigcommerce/big-design/commit/72589a6ebeeb8335d118cf379cec6a0ce6e4976b))
* **component:** properly handle Dropdown if all options are disabled ([#275](https://github.com/bigcommerce/big-design/issues/275)) ([7834892](https://github.com/bigcommerce/big-design/commit/7834892cebffd279c9b087cc1d26ebb8a86c04fa))
* **component:** use iconOnly buttons and remove 'per page' in Pagination ([#279](https://github.com/bigcommerce/big-design/issues/279)) ([d8e8176](https://github.com/bigcommerce/big-design/commit/d8e817629ab258f979a864f1517ee7318af29166))


### Features

* **component:** add tab trap for modals and dialogs ([dcacbf9](https://github.com/bigcommerce/big-design/commit/dcacbf96a38bef1134e2a8dcbd986f6362e0e2b7))
* **component:** add transitions to components ([#274](https://github.com/bigcommerce/big-design/issues/274)) ([c94c4df](https://github.com/bigcommerce/big-design/commit/c94c4dfd802ea2ea6e71db36613fa6169af2900b))
* **component:** adds list groups w/headers to Dropdown component ([#288](https://github.com/bigcommerce/big-design/issues/288)) ([ff031e9](https://github.com/bigcommerce/big-design/commit/ff031e9bf87462d73a3238d6b027334dc61b16db))
* **component:** ignore theme prop overrides ([24b92f9](https://github.com/bigcommerce/big-design/commit/24b92f9873fe4f51975b7bd00300c8ce73484ea3))


### BREAKING CHANGES

* **component:** `theme` prop override is no longer supported.





## [0.13.2](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.13.1...@bigcommerce/big-design@0.13.2) (2019-11-14)


### Bug Fixes

* **component:** dropdowns inside TableFigure ([#262](https://github.com/bigcommerce/big-design/issues/262)) ([2b271ca](https://github.com/bigcommerce/big-design/commit/2b271ca))
* **component:** flex props handle falsy values ([#261](https://github.com/bigcommerce/big-design/issues/261)) ([335fdd4](https://github.com/bigcommerce/big-design/commit/335fdd4))
* **component:** panel now forwards data attrs ([70f30f5](https://github.com/bigcommerce/big-design/commit/70f30f5))
* **component:** prevent action prop from being passed to List component ([#269](https://github.com/bigcommerce/big-design/issues/269)) ([84c3a01](https://github.com/bigcommerce/big-design/commit/84c3a01))
* **component:** set correct display names ([#270](https://github.com/bigcommerce/big-design/issues/270)) ([52edba4](https://github.com/bigcommerce/big-design/commit/52edba4))
* extra spacing in Select components ([#271](https://github.com/bigcommerce/big-design/issues/271)) ([ffdd0bc](https://github.com/bigcommerce/big-design/commit/ffdd0bc))
* prevent enter on selects from submitting the form ([#272](https://github.com/bigcommerce/big-design/issues/272)) ([49a96a4](https://github.com/bigcommerce/big-design/commit/49a96a4))
* pull from master and updated testing snapshot that failed in previous pr ([#267](https://github.com/bigcommerce/big-design/issues/267)) ([56cbb15](https://github.com/bigcommerce/big-design/commit/56cbb15))


### Features

* **component:**  add customActions prop to Table and StatefulTable ([#263](https://github.com/bigcommerce/big-design/issues/263)) ([ad102d4](https://github.com/bigcommerce/big-design/commit/ad102d4))
* **component:** add exclude padding/margin props helper ([0b0e9a4](https://github.com/bigcommerce/big-design/commit/0b0e9a4))
* add hiddenLabel prop to Checkbox component ([#264](https://github.com/bigcommerce/big-design/issues/264)) ([54f63b9](https://github.com/bigcommerce/big-design/commit/54f63b9))





## [0.13.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.13.0...@bigcommerce/big-design@0.13.1) (2019-11-12)


### Bug Fixes

* **component:** allow 0 as values in selects ([#257](https://github.com/bigcommerce/big-design/issues/257)) ([92c6238](https://github.com/bigcommerce/big-design/commit/92c6238))
* **component:** table header right alignment ([#256](https://github.com/bigcommerce/big-design/issues/256)) ([1d91e4f](https://github.com/bigcommerce/big-design/commit/1d91e4f))
* **component:** textarea was missing optional text when not required ([721891c](https://github.com/bigcommerce/big-design/commit/721891c))


### Features

* **all:** better tree shaking ([c0998a7](https://github.com/bigcommerce/big-design/commit/c0998a7))





# [0.13.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.12.0...@bigcommerce/big-design@0.13.0) (2019-11-11)


### Bug Fixes

* adds name prop to select ([#229](https://github.com/bigcommerce/big-design/issues/229)) ([91a7abe](https://github.com/bigcommerce/big-design/commit/91a7abe))
* **component:** grid and flex forward as prop ([fce3c26](https://github.com/bigcommerce/big-design/commit/fce3c26))
* **component:** reduce radio/checkbox label margin ([#247](https://github.com/bigcommerce/big-design/issues/247)) ([08caa05](https://github.com/bigcommerce/big-design/commit/08caa05))
* **component:** table header not aligning properly ([#231](https://github.com/bigcommerce/big-design/issues/231)) ([542cb64](https://github.com/bigcommerce/big-design/commit/542cb64))


### Features

* **all:** bump styled-components peerDependency version ([fd89fa3](https://github.com/bigcommerce/big-design/commit/fd89fa3))
* **component:** add display prop to utility components ([c5192b9](https://github.com/bigcommerce/big-design/commit/c5192b9))
* **component:** add external prop to link component ([2acee91](https://github.com/bigcommerce/big-design/commit/2acee91))
* **component:** add fullWidth prop to Form ([#246](https://github.com/bigcommerce/big-design/issues/246)) ([b87fc4b](https://github.com/bigcommerce/big-design/commit/b87fc4b))
* **component:** add stickiness to table header and actions ([17e3c57](https://github.com/bigcommerce/big-design/commit/17e3c57))
* **component:** add text modifiers to typography ([#240](https://github.com/bigcommerce/big-design/issues/240)) ([f64c4b4](https://github.com/bigcommerce/big-design/commit/f64c4b4))
* **component:** allow Box to render with a different tag ([#242](https://github.com/bigcommerce/big-design/issues/242)) ([a933b45](https://github.com/bigcommerce/big-design/commit/a933b45))
* **component:** rename onChange to onItemChange ([#251](https://github.com/bigcommerce/big-design/issues/251)) ([7e609d8](https://github.com/bigcommerce/big-design/commit/7e609d8))
* **component:** stateful table ([#230](https://github.com/bigcommerce/big-design/issues/230)) ([1318bfd](https://github.com/bigcommerce/big-design/commit/1318bfd))
* **component:** tooltip for dropdown item ([#228](https://github.com/bigcommerce/big-design/issues/228)) ([4e5fc50](https://github.com/bigcommerce/big-design/commit/4e5fc50))
* CHI-696 select component accepts an inputRef prop ([#233](https://github.com/bigcommerce/big-design/issues/233)) ([847e8ef](https://github.com/bigcommerce/big-design/commit/847e8ef))


### BREAKING CHANGES

* **component:** `onChange` is renamed to `onItemChange`
* **all:** bumped peer dependency of styled-components to `^4.3.0`
* **component:** `<Table />` no longer accepts Margin props.





# [0.12.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.11.1...@bigcommerce/big-design@0.12.0) (2019-10-29)


* Restrict Dropdown (#212) ([8608609](https://github.com/bigcommerce/big-design/commit/8608609)), closes [#212](https://github.com/bigcommerce/big-design/issues/212)


### Bug Fixes

* **component:** pagination mobile styles ([59cbfe3](https://github.com/bigcommerce/big-design/commit/59cbfe3))


### Features

* **component:** add filterable prop to Select ([#227](https://github.com/bigcommerce/big-design/issues/227)) ([f05d343](https://github.com/bigcommerce/big-design/commit/f05d343))
* **component:** add header and action props to Panel ([8a90002](https://github.com/bigcommerce/big-design/commit/8a90002))
* **component:** add multiselect ([#200](https://github.com/bigcommerce/big-design/issues/200)) ([02acf73](https://github.com/bigcommerce/big-design/commit/02acf73))
* **component:** add optional text to non required inputs ([#208](https://github.com/bigcommerce/big-design/issues/208)) ([463e99f](https://github.com/bigcommerce/big-design/commit/463e99f))
* **component:** add sort functionality to Table component ([2d30461](https://github.com/bigcommerce/big-design/commit/2d30461))
* **component:** allow state override of table select all checkbox ([#224](https://github.com/bigcommerce/big-design/issues/224)) ([b64eda1](https://github.com/bigcommerce/big-design/commit/b64eda1))
* **component:** convert Button component to FC ([#221](https://github.com/bigcommerce/big-design/issues/221)) ([90759d6](https://github.com/bigcommerce/big-design/commit/90759d6))
* **component:** restrict actions and header from modals ([#209](https://github.com/bigcommerce/big-design/issues/209)) ([bc85d25](https://github.com/bigcommerce/big-design/commit/bc85d25))
* **component:** restrict Select ([#218](https://github.com/bigcommerce/big-design/issues/218)) ([66378ed](https://github.com/bigcommerce/big-design/commit/66378ed))
* **component:** rework Table component ([11389b9](https://github.com/bigcommerce/big-design/commit/11389b9))
* **component:** table multi-page select ([#225](https://github.com/bigcommerce/big-design/issues/225)) ([00140ab](https://github.com/bigcommerce/big-design/commit/00140ab))
* **component:** update Tabs component to be more restrictive ([683d768](https://github.com/bigcommerce/big-design/commit/683d768))


### BREAKING CHANGES

* **component:** Select now accepts an array of `Options` and an `Action` object. Will call `onChange` when option is selected with the chosen `value` and `option` as arguments. For more details see the usage examples in our docs.

Old:
```jsx
<Select
    label="Countries"
    maxHeight={300}
    onActionClick={() => null}
    onItemChange={handleChange}
    placeholder={'Choose country'}
    placement={'bottom-start'}
    required
    value={value}
>
    <Select.Option value="us">United States</Select.Option>
    <Select.Option value="mx">Mexico</Select.Option>
    <Select.Option value="ca">Canada</Select.Option>
    <Select.Option value="ru" disabled>Russia</Select.Option>
    <Select.Action>Action</Select.Action>
</Select>
```

New:
```jsx
<Select
    action={{
        actionType: 'destructive',
        content: 'Remove Country',
        icon: <DeleteIcon />,
        onClick: () => null,
    }}
    label="Countries"
    maxHeight={300}
    onChange={handleChange}
    options={[
        { value: 'us', content: 'United States' },
        { value: 'mx', content: 'Mexico' },
        { value: 'ca', content: 'Canada' },
        { value: 'ru', content: 'Russia', disabled: true },
    ]}
    placeholder={'Choose country'}
    placement={'bottom-start'}
    required
    value={value}
/>
```
* **component:** Tabs now accepts an `items` prop to render tab items and omits children from being rendered.

Old:
```jsx
<Tabs>
  <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
  {/* ... */}
</Tabs>
```

New:
```jsx
<Tabs activeTab="tab1" items={[{ id: 'tab1', title: 'Tab 1' }]} onTabClick={() => {}} />
```
* **component:** `Table` component no longer exposes Actions, Head, Row, Body, Cell
statics. Check out the updated [Table
docs](https://bigcommerce.github.io/big-design/table) for a more
detailed usage.
* Dropdown now accepts an array of `DropdownItems` & `DropdownItemLinks` as `options`.

Old:
```jsx
<Dropdown onItemClick={onClick} trigger={<Button>Button</Button>}>
  <Dropdown.Item value={0}>Option</Dropdown.Item>
  <Dropdown.Item value={1}>Option</Dropdown.Item>
  <Dropdown.Item value={2}>Option</Dropdown.Item>
</Dropdown>
```

New:
```jsx
<Dropdown
  options={[
    { content: 'Option', value: 0, onClick },
    { content: 'Option', value: 1, onClick },
    { content: 'Option', value: 2, onClick, actionType: 'destructive' },
    { content: 'Option', value: 3, onClick, icon: <CheckCircleIcon /> },
  ]}
  trigger={<Button>Button</Button>}/>
```
* **component:** Modal is now restricted and uses a `header` and `actions` props instead.

Old:
```jsx
<Modal isOpen={isOpen}>
  <Modal.Header>Modal Title</Modal.Header>
  <Modal.Body>
    <Text>Body content.</Text>
  </Modal.Body>
  <Modal.Actions>
    <Button variant="subtle" onClick={() => setIsOpen(false)}>
       Cancel
     </Button>
  </Modal.Actions>
</Modal>
```

New:
```jsx
<Modal 
  actions={[{text: 'Cancel', variant: 'subtle', onClick: () => setIsOpen(false)}]}
  isOpen={isOpen} 
  header="Modal Title">
  <Text>Body content.</Text>
</Modal>
```





## [0.11.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.11.0...@bigcommerce/big-design@0.11.1) (2019-09-24)


### Bug Fixes

* **component:** fix children not rendering via filter ([#204](https://github.com/bigcommerce/big-design/issues/204)) ([26dbb78](https://github.com/bigcommerce/big-design/commit/26dbb78))





# [0.11.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.10.0...@bigcommerce/big-design@0.11.0) (2019-09-23)


### Features

* **component:** add Table component ([#201](https://github.com/bigcommerce/big-design/issues/201)) ([64b7dcd](https://github.com/bigcommerce/big-design/commit/64b7dcd))





# [0.10.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.9.0...@bigcommerce/big-design@0.10.0) (2019-09-23)


### Bug Fixes

* **component:** mock popper.js globally ([8a31391](https://github.com/bigcommerce/big-design/commit/8a31391))


### Features

* **component:** add indeterminate state to checkboxes ([#197](https://github.com/bigcommerce/big-design/issues/197)) ([5146fdb](https://github.com/bigcommerce/big-design/commit/5146fdb))





# [0.9.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.8.0...@bigcommerce/big-design@0.9.0) (2019-09-17)


### Bug Fixes

* updates the input label if a matching children appears ([#193](https://github.com/bigcommerce/big-design/issues/193)) ([08b951c](https://github.com/bigcommerce/big-design/commit/08b951c))


### Features

* **component:** create basic pagination component ([#188](https://github.com/bigcommerce/big-design/issues/188)) ([d79ede5](https://github.com/bigcommerce/big-design/commit/d79ede5))





# [0.8.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.7.1...@bigcommerce/big-design@0.8.0) (2019-09-06)


### Bug Fixes

* **component:** forward theme prop ([#192](https://github.com/bigcommerce/big-design/issues/192)) ([5bc298b](https://github.com/bigcommerce/big-design/commit/5bc298b))


### Features

* **component:** add chip component ([#189](https://github.com/bigcommerce/big-design/issues/189)) ([8258f5e](https://github.com/bigcommerce/big-design/commit/8258f5e))
* **component:** add memoization to certain components ([#191](https://github.com/bigcommerce/big-design/issues/191)) ([0f84a23](https://github.com/bigcommerce/big-design/commit/0f84a23))
* **component:** add positionFixed prop to Select ([b941b64](https://github.com/bigcommerce/big-design/commit/b941b64))





## [0.7.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.7.0...@bigcommerce/big-design@0.7.1) (2019-08-30)


### Bug Fixes

* **component:** textarea rendering two errors ([#186](https://github.com/bigcommerce/big-design/issues/186)) ([a649928](https://github.com/bigcommerce/big-design/commit/a649928))
* **component:** use font configs for link component ([#185](https://github.com/bigcommerce/big-design/issues/185)) ([0a144a6](https://github.com/bigcommerce/big-design/commit/0a144a6))





# [0.7.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.6.4...@bigcommerce/big-design@0.7.0) (2019-08-29)


### Bug Fixes

* **component:** allow modal to be open on initial render ([#184](https://github.com/bigcommerce/big-design/issues/184)) ([57236e7](https://github.com/bigcommerce/big-design/commit/57236e7))


### Features

* **component:** add ability to pass arrays into input error ([#182](https://github.com/bigcommerce/big-design/issues/182)) ([eb4d4a5](https://github.com/bigcommerce/big-design/commit/eb4d4a5))





## [0.6.4](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.6.3...@bigcommerce/big-design@0.6.4) (2019-08-20)

**Note:** Version bump only for package @bigcommerce/big-design





## [0.6.3](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.6.2...@bigcommerce/big-design@0.6.3) (2019-08-19)


### Bug Fixes

* **component:** add missing z-index to components ([#176](https://github.com/bigcommerce/big-design/issues/176)) ([800d2fc](https://github.com/bigcommerce/big-design/commit/800d2fc))
* export margin and padding mixins/functions ([#179](https://github.com/bigcommerce/big-design/issues/179)) ([85ab8d6](https://github.com/bigcommerce/big-design/commit/85ab8d6))
* **component:** added scroll prevention on open modals ([#177](https://github.com/bigcommerce/big-design/issues/177)) ([56ed4ed](https://github.com/bigcommerce/big-design/commit/56ed4ed))


### BREAKING CHANGES

* **component:** `theme.zIndex` no longer has `theme.zIndex.dropdown`





## [0.6.2](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.6.1...@bigcommerce/big-design@0.6.2) (2019-08-15)


### Bug Fixes

* **component:** select will now change input text if value changes ([#171](https://github.com/bigcommerce/big-design/issues/171)) ([25facc6](https://github.com/bigcommerce/big-design/commit/25facc6))





## [0.6.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.6.0...@bigcommerce/big-design@0.6.1) (2019-08-13)


### Bug Fixes

* **component:** bug with inputs rendering error icon ([#161](https://github.com/bigcommerce/big-design/issues/161)) ([1dc182b](https://github.com/bigcommerce/big-design/commit/1dc182b))





# [0.6.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.5.0...@bigcommerce/big-design@0.6.0) (2019-08-13)


### Bug Fixes

* use theme font props ([#62](https://github.com/bigcommerce/big-design/issues/62)) ([135bf65](https://github.com/bigcommerce/big-design/commit/135bf65))
* **component:** dropdown will default to position bottom-start ([#71](https://github.com/bigcommerce/big-design/issues/71)) ([c0beb96](https://github.com/bigcommerce/big-design/commit/c0beb96))
* **component:** prevent document scrolling when using arrow keys ([#124](https://github.com/bigcommerce/big-design/issues/124)) ([0892c7c](https://github.com/bigcommerce/big-design/commit/0892c7c))
* **component:** prevent scroll bug in dropdown components ([15fb2dc](https://github.com/bigcommerce/big-design/commit/15fb2dc))
* **component:** recenter List when Select is filtered ([fa4ac45](https://github.com/bigcommerce/big-design/commit/fa4ac45))
* **component:** responsive grid wasn't working properly ([#155](https://github.com/bigcommerce/big-design/issues/155)) ([7b65856](https://github.com/bigcommerce/big-design/commit/7b65856))
* **component:** select will reset text if value returns empty string ([#130](https://github.com/bigcommerce/big-design/issues/130)) ([f643436](https://github.com/bigcommerce/big-design/commit/f643436))
* **docs:** restyle and rearrange sidenav ([#151](https://github.com/bigcommerce/big-design/issues/151)) ([1be86d1](https://github.com/bigcommerce/big-design/commit/1be86d1))
* **theme:** issue with font sizes in createTheme ([#135](https://github.com/bigcommerce/big-design/issues/135)) ([313ff46](https://github.com/bigcommerce/big-design/commit/313ff46))


### Features

* **component:**  modal withBorder prop ([069cb09](https://github.com/bigcommerce/big-design/commit/069cb09))
* **component:** add border-box to Box components and update tests ([#110](https://github.com/bigcommerce/big-design/issues/110)) ([597f71d](https://github.com/bigcommerce/big-design/commit/597f71d))
* **component:** add button spacing in groups ([#117](https://github.com/bigcommerce/big-design/issues/117)) ([a93b1b0](https://github.com/bigcommerce/big-design/commit/a93b1b0))
* **component:** add responsive breakpoints for Flex props ([#113](https://github.com/bigcommerce/big-design/issues/113)) ([335c640](https://github.com/bigcommerce/big-design/commit/335c640))
* **component:** add spacing between buttons when used in groups ([#105](https://github.com/bigcommerce/big-design/issues/105)) ([cb89c10](https://github.com/bigcommerce/big-design/commit/cb89c10))
* **component:** color prop for typography components ([#107](https://github.com/bigcommerce/big-design/issues/107)) ([918f260](https://github.com/bigcommerce/big-design/commit/918f260))
* **component:** decrease bottom margin on Panels ([#111](https://github.com/bigcommerce/big-design/issues/111)) ([2fd54e6](https://github.com/bigcommerce/big-design/commit/2fd54e6))
* **component:** remove custom spinner prop on buttons ([#80](https://github.com/bigcommerce/big-design/issues/80)) ([f4efc55](https://github.com/bigcommerce/big-design/commit/f4efc55))
* **component:** remove dropdown actions ([#104](https://github.com/bigcommerce/big-design/issues/104)) ([9e00e61](https://github.com/bigcommerce/big-design/commit/9e00e61))
* **component:** remove Spinner component ([1527559](https://github.com/bigcommerce/big-design/commit/1527559))
* **component:** rename elevation to shadow ([ee215f0](https://github.com/bigcommerce/big-design/commit/ee215f0))
* **component:** rename GlobalStyle to GlobalStyles ([#126](https://github.com/bigcommerce/big-design/issues/126)) ([e7a231e](https://github.com/bigcommerce/big-design/commit/e7a231e))
* **component:** rename Lozenge to Badge ([#118](https://github.com/bigcommerce/big-design/issues/118)) ([246a898](https://github.com/bigcommerce/big-design/commit/246a898))
* **component:** tooltip api change ([6c941bf](https://github.com/bigcommerce/big-design/commit/6c941bf))
* **component:** tooltip update styles ([733c419](https://github.com/bigcommerce/big-design/commit/733c419))
* **component:** update badge padding and custom font size ([8da571d](https://github.com/bigcommerce/big-design/commit/8da571d))
* **component:** update error state handling on form component ([#129](https://github.com/bigcommerce/big-design/issues/129)) ([e665479](https://github.com/bigcommerce/big-design/commit/e665479))
* **component:** update grid component with responsive props ([#131](https://github.com/bigcommerce/big-design/issues/131)) ([1206e60](https://github.com/bigcommerce/big-design/commit/1206e60))
* **component:** update tab styles to match latest designs ([e7a21b4](https://github.com/bigcommerce/big-design/commit/e7a21b4))
* **component:** use new icons package ([e522f97](https://github.com/bigcommerce/big-design/commit/e522f97))
* **component:** use new theme package ([4da89f0](https://github.com/bigcommerce/big-design/commit/4da89f0))
* **docs:** use next instead of storybook ([#122](https://github.com/bigcommerce/big-design/issues/122)) ([986ebd6](https://github.com/bigcommerce/big-design/commit/986ebd6))
* **icons:** initial package setup ([#89](https://github.com/bigcommerce/big-design/issues/89)) ([acfe8fe](https://github.com/bigcommerce/big-design/commit/acfe8fe))
* **story:** code preview component ([#59](https://github.com/bigcommerce/big-design/issues/59)) ([12108bf](https://github.com/bigcommerce/big-design/commit/12108bf))
* add disabled prop to select ([#92](https://github.com/bigcommerce/big-design/issues/92)) ([f889722](https://github.com/bigcommerce/big-design/commit/f889722))
* add prop table component to storybook ([#61](https://github.com/bigcommerce/big-design/issues/61)) ([2c9087c](https://github.com/bigcommerce/big-design/commit/2c9087c))
* align customValidity with existence of error prop ([#158](https://github.com/bigcommerce/big-design/issues/158)) ([6af2b03](https://github.com/bigcommerce/big-design/commit/6af2b03))
* remove readme from stories ([#65](https://github.com/bigcommerce/big-design/issues/65)) ([f266ebd](https://github.com/bigcommerce/big-design/commit/f266ebd))
* transform icon names and update exports ([#66](https://github.com/bigcommerce/big-design/issues/66)) ([e1d7d73](https://github.com/bigcommerce/big-design/commit/e1d7d73))


### BREAKING CHANGES

* **component:** Tooltip now uses a `trigger` prop and uses `children`
as the content.

Old:
```jsx
<Tooltip content="Tooltip Content" placement="right">
  <Button>Button</Button>
</Tooltip>
```

New:
```jsx
<Tooltip trigger={<Button>Hover</Button>} placement="right">
  Tooltip Content
</Tooltip>
```
* **component:** theme now lives in its own package
`@bigcommerce/big-design-theme` if you are using `createTheme`,
`addValues`, `defaultTheme`, `remCalc`, `ThemeInterface` you will now
need to import it from the new package.
* **component:** Changed Grid and Grid.Item props to be more verbose (e.g. areas -> gridAreas)
* **component:** rename `elevation` props to `shadow`
* **component:** `GlobalStyle` is now `GlobalStyles`
* **component:** Form.Row components are renamed to Form.Group

* feat: wip input error states

* feat: improved error handling

* feat: add inline documentation to Group

* feat: rebase and fix small issues

* test: update tests for feature

* fix: update PR comments
* **component:** Flex component flexDirection prop now defaults to responsive object. Flex component props renamed to be more contextual.

If you had direction="row" this will now set your all breakpoints to flex-direction: row instead of column for mobile/row for desktop.

Flex:
direction -> flexDirection
wrap -> flexWrap

Flex.Item:
basis -> flexBasis
grow -> flexGrow
order -> flexOrder
shrink -> flexShrink

* feat(component): add responsive breakpoints for Flex props

* refactor(component): change flex prop names

* refactor: change variable name to be more descriptive

* refactor: move flexed item props into same file

* refactor: moved locations of new flex changes

* refactor: rename variables

* feat: resolve PR comments

* fix: remove unused imports

* fix: remove unused argument
* **component:** Buttons now have spacing between each other when used in groups.

If you added margin to add spacing between buttons, you will have to audit those spots in your codebase.

* feat(component): add back in button spacing

* feat: refine button spacing, update tests, update stories

* fix: update component to generate less css
* **component:** Spinner component no longer exists, ProgressCircle can
be used in some usecases.
* **component:** all icons got moved to `@bigcommerce/big-design-icons`
package and some of them were renamed.
* **component:** Lozenge has been renamed to Badge. If you were using the Lozenge component, you will need to change all references to 'badge'

* docs: add base doc files

* docs(story): finish lozenge documentation

* feat(component): update lozenge to badge

* feat(component): remove primary variant

* test(component): add badge tests

* fix(component): fix import in Badge spec

* feat(component): resolve PR comments

* feat(component): add tests for background color and resolve PR comments





# [0.5.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.4.0...@bigcommerce/big-design@0.5.0) (2019-07-15)


### Bug Fixes

* iconOnly would show iconLeft & iconRight ([#55](https://github.com/bigcommerce/big-design/issues/55)) ([80bcd94](https://github.com/bigcommerce/big-design/commit/80bcd94))
* updated Modal didUpdate to look at previous props ([#42](https://github.com/bigcommerce/big-design/issues/42)) ([8332e3b](https://github.com/bigcommerce/big-design/commit/8332e3b))
* use flex to center icon ([#47](https://github.com/bigcommerce/big-design/issues/47)) ([2a06e4e](https://github.com/bigcommerce/big-design/commit/2a06e4e))


### Features

* add disabled options to select ([#45](https://github.com/bigcommerce/big-design/issues/45)) ([8713a7b](https://github.com/bigcommerce/big-design/commit/8713a7b))
* add required attr to Select component ([#58](https://github.com/bigcommerce/big-design/issues/58)) ([ed933f0](https://github.com/bigcommerce/big-design/commit/ed933f0))
* add textarea component ([#48](https://github.com/bigcommerce/big-design/issues/48)) ([2c48269](https://github.com/bigcommerce/big-design/commit/2c48269))
* export additional props to package ([#43](https://github.com/bigcommerce/big-design/issues/43)) ([e935774](https://github.com/bigcommerce/big-design/commit/e935774))
* **component:** add remCalc helper ([#60](https://github.com/bigcommerce/big-design/issues/60)) ([87ab876](https://github.com/bigcommerce/big-design/commit/87ab876))
* **component:** progressbar & progresscircle components ([1c3e006](https://github.com/bigcommerce/big-design/commit/1c3e006))





# [0.4.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.3.0...@bigcommerce/big-design@0.4.0) (2019-06-17)


### Features

* **component:** add ellipsis prop to Typography components ([2af474a](https://github.com/bigcommerce/big-design/commit/2af474a))
* **component:** select and dropdown now support an action button ([#36](https://github.com/bigcommerce/big-design/issues/36)) ([233f1fc](https://github.com/bigcommerce/big-design/commit/233f1fc))
* **component:** update modals with variants and responsive designs ([d83f39c](https://github.com/bigcommerce/big-design/commit/d83f39c))
* **component:** update panels with responsive specs ([#40](https://github.com/bigcommerce/big-design/issues/40)) ([494d38f](https://github.com/bigcommerce/big-design/commit/494d38f))





# [0.3.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.2.0...@bigcommerce/big-design@0.3.0) (2019-05-14)


### Bug Fixes

* **component:** select will show unfiltered items when opened ([a7d9a75](https://github.com/bigcommerce/big-design/commit/a7d9a75))


### Features

* **component:** dropdown component ([69bb8a1](https://github.com/bigcommerce/big-design/commit/69bb8a1))
* **component:** list component ([dec5899](https://github.com/bigcommerce/big-design/commit/dec5899))
* **component:** select component ([4e0f6de](https://github.com/bigcommerce/big-design/commit/4e0f6de))





# [0.2.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.1.2...@bigcommerce/big-design@0.2.0) (2019-04-30)


### Features

* **component:** add individual border props to Box ([2559e28](https://github.com/bigcommerce/big-design/commit/2559e28))
* **component:** return property value on theme border ([be11e6a](https://github.com/bigcommerce/big-design/commit/be11e6a))


### BREAKING CHANGES

* **component:** `theme.border` and `theme.borderRadius` now only
return the property value.

If you are using something like `${({ theme }) => theme.border.box}` you
need to update it to `border: ${({ theme }) => theme.border.box}`. The
same applies to border-radius





## [0.1.2](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.1.1...@bigcommerce/big-design@0.1.2) (2019-04-23)


### Bug Fixes

* **component:** CHI-399 update lozenge colors ([#28](https://github.com/bigcommerce/big-design/issues/28)) ([e7132d3](https://github.com/bigcommerce/big-design/commit/e7132d3))
* **component:** ignore dist files on lint-staged ([c277db6](https://github.com/bigcommerce/big-design/commit/c277db6))





## [0.1.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design@0.1.0...@bigcommerce/big-design@0.1.1) (2019-04-11)


### Bug Fixes

* **component:** include dependency types ([79d072d](https://github.com/bigcommerce/big-design/commit/79d072d))





# 0.1.0 (2019-04-11)


### Bug Fixes

* **component:** mobile breakpoint min-width ([73a76a1](https://github.com/bigcommerce/big-design/commit/73a76a1))


### Features

* **component:** box component ([18d72b8](https://github.com/bigcommerce/big-design/commit/18d72b8))
* **component:** button component ([09b3d86](https://github.com/bigcommerce/big-design/commit/09b3d86))
* **component:** checkbox component ([86454d7](https://github.com/bigcommerce/big-design/commit/86454d7))
* **component:** createRGBA helper and expose theme helpers ([145ec39](https://github.com/bigcommerce/big-design/commit/145ec39))
* **component:** default theme ([2bc2410](https://github.com/bigcommerce/big-design/commit/2bc2410))
* **component:** flex component ([e3cb435](https://github.com/bigcommerce/big-design/commit/e3cb435))
* **component:** flex item component ([9062220](https://github.com/bigcommerce/big-design/commit/9062220))
* **component:** form component ([1f4a8dc](https://github.com/bigcommerce/big-design/commit/1f4a8dc))
* **component:** global style component ([c6c906c](https://github.com/bigcommerce/big-design/commit/c6c906c))
* **component:** grid component ([4655611](https://github.com/bigcommerce/big-design/commit/4655611))
* **component:** icon components ([9bb6a8b](https://github.com/bigcommerce/big-design/commit/9bb6a8b))
* **component:** input component ([0f55ee2](https://github.com/bigcommerce/big-design/commit/0f55ee2))
* **component:** link component ([825dc2c](https://github.com/bigcommerce/big-design/commit/825dc2c))
* **component:** lozenge component ([88c5d0c](https://github.com/bigcommerce/big-design/commit/88c5d0c))
* **component:** mixin-like helpers for margin and padding ([02ea7c5](https://github.com/bigcommerce/big-design/commit/02ea7c5))
* **component:** modal component ([6b5f4bf](https://github.com/bigcommerce/big-design/commit/6b5f4bf))
* **component:** panel component ([511c03f](https://github.com/bigcommerce/big-design/commit/511c03f))
* **component:** radio component ([fbfb00e](https://github.com/bigcommerce/big-design/commit/fbfb00e))
* **component:** spinner component ([b95f31e](https://github.com/bigcommerce/big-design/commit/b95f31e))
* **component:** tabs component ([7dd49b7](https://github.com/bigcommerce/big-design/commit/7dd49b7))
* **component:** tooltip component ([b61b61e](https://github.com/bigcommerce/big-design/commit/b61b61e))
* **component:** typography components ([6b98346](https://github.com/bigcommerce/big-design/commit/6b98346))
