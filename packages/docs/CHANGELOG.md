# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.17.2](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.17.1...@bigcommerce/docs@0.17.2) (2020-04-13)


### Bug Fixes

* add extra options for maxHeight examples and set up tests ([#367](https://github.com/bigcommerce/big-design/issues/367)) ([05f6aca](https://github.com/bigcommerce/big-design/commit/05f6aca5043c738d6f0714f23b94cee0dcd8dbf7))


### Features

* **component:** CHP-6188 adds grouping options to Select component ([#350](https://github.com/bigcommerce/big-design/issues/350)) ([16a8dd7](https://github.com/bigcommerce/big-design/commit/16a8dd763099a6de84f8d7a6b904fb539c50d364))
* **component:** CHP-6225 adds ability to hide individual table headers ([#359](https://github.com/bigcommerce/big-design/issues/359)) ([b61b486](https://github.com/bigcommerce/big-design/commit/b61b486fd683bbaec443ce578dbebc5f338d10b9))
* **docs:** add og:image for link preview ([#360](https://github.com/bigcommerce/big-design/issues/360)) ([31bc780](https://github.com/bigcommerce/big-design/commit/31bc780ab250472f164e08eb5d77c22a5dbe78fd))





## [0.17.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.17.0...@bigcommerce/docs@0.17.1) (2020-03-25)

**Note:** Version bump only for package @bigcommerce/docs





# [0.17.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.16.0...@bigcommerce/docs@0.17.0) (2020-03-25)


### Features

* **component:** add description attribute for Checkbox ([#349](https://github.com/bigcommerce/big-design/issues/349)) ([9a9eeb4](https://github.com/bigcommerce/big-design/commit/9a9eeb4a8d0a316bc8dec0f1c9971efca5d86983))
* **component:** add description attribute for Radio ([#345](https://github.com/bigcommerce/big-design/issues/345)) ([42365e9](https://github.com/bigcommerce/big-design/commit/42365e9d1b6ce57dd2ff963bcfd93c2ae9caa54c))
* **component:** stateful table sortFn ([#353](https://github.com/bigcommerce/big-design/issues/353)) ([3a715a3](https://github.com/bigcommerce/big-design/commit/3a715a3b4585ca6a620447d27f645dcedb51fc59))





# [0.16.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.15.0...@bigcommerce/docs@0.16.0) (2020-02-21)


### Bug Fixes

* **docs:** public path ([#333](https://github.com/bigcommerce/big-design/issues/333)) ([9db4d26](https://github.com/bigcommerce/big-design/commit/9db4d2686e08635b01d853fd8936a06f38695228))


### Features

* **component:** add Alerts, InlineAlerts, and Message components ([#340](https://github.com/bigcommerce/big-design/issues/340)) ([d541276](https://github.com/bigcommerce/big-design/commit/d54127603fba47b46cb35c3db4caf53ab24bafc3))
* **component:** convert Dropdown/Select to FC and add MultiSelect ([#303](https://github.com/bigcommerce/big-design/issues/303)) ([0ab0e50](https://github.com/bigcommerce/big-design/commit/0ab0e50878405e3da18fbf4e6dc934539a0d6446))
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





# [0.15.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.14.0...@bigcommerce/docs@0.15.0) (2020-02-06)


### Bug Fixes

* **component:** makes label and options props required for dropdowns and groups ([#299](https://github.com/bigcommerce/big-design/issues/299)) ([6f3405c](https://github.com/bigcommerce/big-design/commit/6f3405c4086f348afbe79190c3035c59d5d101f7))
* **docs:** table actions prop name ([30e06b4](https://github.com/bigcommerce/big-design/commit/30e06b44c536be944f0d9e1a865eddf8cdd7d02f))
* **docs:** table with sort example ([30dc955](https://github.com/bigcommerce/big-design/commit/30dc955d870b05a2f0d9dea912e16c325d9a41e0))
* add react-hooks eslint and fix missing deps/issues ([#330](https://github.com/bigcommerce/big-design/issues/330)) ([da3fbd6](https://github.com/bigcommerce/big-design/commit/da3fbd68181e98e43a95de7fce9956be91afc9b8))


### Features

* **component:** add ellipsis prop to Link ([#310](https://github.com/bigcommerce/big-design/issues/310)) ([c2f9b78](https://github.com/bigcommerce/big-design/commit/c2f9b78ef39a8ce39da8de2418328b77dc7c402b))
* **component:** add hidden headers props to Table and StatefulTable ([#297](https://github.com/bigcommerce/big-design/issues/297)) ([d80641a](https://github.com/bigcommerce/big-design/commit/d80641aa9a53ea55ed52671fa7d3f8b5eab26796))
* **component:** add label id's to form fields ([#304](https://github.com/bigcommerce/big-design/issues/304)) ([0620612](https://github.com/bigcommerce/big-design/commit/06206120d9e510a89a4298cfafde582710d4f3db))
* **component:** add text-transform props to Text and Small ([#307](https://github.com/bigcommerce/big-design/issues/307)) ([5d12784](https://github.com/bigcommerce/big-design/commit/5d127844504a71411b01b21c650e573648cff152))
* **component:** convert Checkbox to FC and remove static members ([#322](https://github.com/bigcommerce/big-design/issues/322)) ([b916d05](https://github.com/bigcommerce/big-design/commit/b916d057b3751f26ca71a531ea450e28faef4ca4))
* **component:** convert Flex to FC and export FlexItem ([#313](https://github.com/bigcommerce/big-design/issues/313)) ([b2d0f21](https://github.com/bigcommerce/big-design/commit/b2d0f21787ea292cd846fd29018cefd08b89b084))
* **component:** convert Form to FC and remove static members ([#324](https://github.com/bigcommerce/big-design/issues/324)) ([fbc5eb9](https://github.com/bigcommerce/big-design/commit/fbc5eb9ae8fac599b89df7c45e7d9f0307f9cc12))
* **component:** convert Grid to FC and export GridItem ([#314](https://github.com/bigcommerce/big-design/issues/314)) ([6e60254](https://github.com/bigcommerce/big-design/commit/6e60254226f084c9d77b97e27bbbff657f409f98))
* **component:** convert Input to FC and remove static members ([#320](https://github.com/bigcommerce/big-design/issues/320)) ([f8fcd86](https://github.com/bigcommerce/big-design/commit/f8fcd869295b5d6b4df3ebc2d2e240a9f7c7934d))
* **component:** convert Modal to FC ([#317](https://github.com/bigcommerce/big-design/issues/317)) ([a525e59](https://github.com/bigcommerce/big-design/commit/a525e59d66bf81a94832ba3e124b3df42772caa1))
* **component:** convert Radio to FC and remove static members ([#323](https://github.com/bigcommerce/big-design/issues/323)) ([b14a6c1](https://github.com/bigcommerce/big-design/commit/b14a6c1fd1090996bfbd6157327c9326accf1abb))
* **component:** convert Textarea to FC and remove static members ([#321](https://github.com/bigcommerce/big-design/issues/321)) ([bd9cc8d](https://github.com/bigcommerce/big-design/commit/bd9cc8d4a5d59b17873e93e8cab6c5f2eb152d77))
* **component:** covert Fieldset to FC and remove static members ([#319](https://github.com/bigcommerce/big-design/issues/319)) ([f75bd49](https://github.com/bigcommerce/big-design/commit/f75bd49dd53d5286ea5a1cb03562a47331d38db1))
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





# [0.14.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.13.2...@bigcommerce/docs@0.14.0) (2019-12-09)


### Bug Fixes

* **docs:** fix modal examples ([b41ecab](https://github.com/bigcommerce/big-design/commit/b41ecabe2ad067a1973d882d9964e706f65e52b5))
* **docs:** prevent hashes on links from being overwritten ([#277](https://github.com/bigcommerce/big-design/issues/277)) ([c0d0a60](https://github.com/bigcommerce/big-design/commit/c0d0a6031677d117b991b2e6cb72c8d7e23e7aeb))


### Features

* **component:** adds list groups w/headers to Dropdown component ([#288](https://github.com/bigcommerce/big-design/issues/288)) ([ff031e9](https://github.com/bigcommerce/big-design/commit/ff031e9bf87462d73a3238d6b027334dc61b16db))
* **example:** setup CodeSandbox example ([#281](https://github.com/bigcommerce/big-design/issues/281)) ([7e36d99](https://github.com/bigcommerce/big-design/commit/7e36d99c63a9544c5a02db933276d9990a8d1e1b))





## [0.13.2](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.13.1...@bigcommerce/docs@0.13.2) (2019-11-14)


### Features

* **component:**  add customActions prop to Table and StatefulTable ([#263](https://github.com/bigcommerce/big-design/issues/263)) ([ad102d4](https://github.com/bigcommerce/big-design/commit/ad102d4))
* add hiddenLabel prop to Checkbox component ([#264](https://github.com/bigcommerce/big-design/issues/264)) ([54f63b9](https://github.com/bigcommerce/big-design/commit/54f63b9))





## [0.13.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.13.0...@bigcommerce/docs@0.13.1) (2019-11-12)


### Bug Fixes

* **component:** allow 0 as values in selects ([#257](https://github.com/bigcommerce/big-design/issues/257)) ([92c6238](https://github.com/bigcommerce/big-design/commit/92c6238))
* **docs:** add Form component around form controls ([a8ed9ff](https://github.com/bigcommerce/big-design/commit/a8ed9ff))


### Features

* **docs:** add js/ts toggle in code previewer ([3ac60e3](https://github.com/bigcommerce/big-design/commit/3ac60e3))





# [0.13.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.12.0...@bigcommerce/docs@0.13.0) (2019-11-11)


### Bug Fixes

* **docs:** checkbox page typo ([#250](https://github.com/bigcommerce/big-design/issues/250)) ([f073be5](https://github.com/bigcommerce/big-design/commit/f073be5))
* **docs:** opening links in new tab ([e6fce3e](https://github.com/bigcommerce/big-design/commit/e6fce3e))
* **docs:** remove duplicate headings ([#249](https://github.com/bigcommerce/big-design/issues/249)) ([a1d41df](https://github.com/bigcommerce/big-design/commit/a1d41df))


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
* **docs:** make more fields required on Form page ([#248](https://github.com/bigcommerce/big-design/issues/248)) ([3a3b037](https://github.com/bigcommerce/big-design/commit/3a3b037))
* **docs:** split table docs ([#232](https://github.com/bigcommerce/big-design/issues/232)) ([823022a](https://github.com/bigcommerce/big-design/commit/823022a))


### BREAKING CHANGES

* **component:** `onChange` is renamed to `onItemChange`
* **all:** bumped peer dependency of styled-components to `^4.3.0`
* **component:** `<Table />` no longer accepts Margin props.





# [0.12.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.11.1...@bigcommerce/docs@0.12.0) (2019-10-29)


* Restrict Dropdown (#212) ([8608609](https://github.com/bigcommerce/big-design/commit/8608609)), closes [#212](https://github.com/bigcommerce/big-design/issues/212)


### Bug Fixes

* **docs:** logo overflowing into side nav ([9237d31](https://github.com/bigcommerce/big-design/commit/9237d31))
* **docs:** remove 'test' label from prop tables ([#211](https://github.com/bigcommerce/big-design/issues/211)) ([312a5b1](https://github.com/bigcommerce/big-design/commit/312a5b1))


### Features

* **component:** add filterable prop to Select ([#227](https://github.com/bigcommerce/big-design/issues/227)) ([f05d343](https://github.com/bigcommerce/big-design/commit/f05d343))
* **component:** add multiselect ([#200](https://github.com/bigcommerce/big-design/issues/200)) ([02acf73](https://github.com/bigcommerce/big-design/commit/02acf73))
* **component:** add sort functionality to Table component ([2d30461](https://github.com/bigcommerce/big-design/commit/2d30461))
* **component:** allow state override of table select all checkbox ([#224](https://github.com/bigcommerce/big-design/issues/224)) ([b64eda1](https://github.com/bigcommerce/big-design/commit/b64eda1))
* **component:** restrict actions and header from modals ([#209](https://github.com/bigcommerce/big-design/issues/209)) ([bc85d25](https://github.com/bigcommerce/big-design/commit/bc85d25))
* **component:** restrict Select ([#218](https://github.com/bigcommerce/big-design/issues/218)) ([66378ed](https://github.com/bigcommerce/big-design/commit/66378ed))
* **component:** update Tabs component to be more restrictive ([683d768](https://github.com/bigcommerce/big-design/commit/683d768))
* **docs:** add figma UI kit and sample app to resources section ([#206](https://github.com/bigcommerce/big-design/issues/206)) ([bb07411](https://github.com/bigcommerce/big-design/commit/bb07411))
* **docs:** add helpful links section ([217b040](https://github.com/bigcommerce/big-design/commit/217b040))
* **docs:** add Table docs + refactor PropsTable ([dce179a](https://github.com/bigcommerce/big-design/commit/dce179a))
* **docs:** add title and collapsible props to PropTable ([81fe57a](https://github.com/bigcommerce/big-design/commit/81fe57a))
* **docs:** update logo with text ([#215](https://github.com/bigcommerce/big-design/issues/215)) ([9062d49](https://github.com/bigcommerce/big-design/commit/9062d49))
* **docs:** update Panel docs ([b744b0b](https://github.com/bigcommerce/big-design/commit/b744b0b))


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





## [0.11.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.11.0...@bigcommerce/docs@0.11.1) (2019-09-24)

**Note:** Version bump only for package @bigcommerce/docs





# [0.11.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.10.0...@bigcommerce/docs@0.11.0) (2019-09-23)


### Features

* **component:** add Table component ([#201](https://github.com/bigcommerce/big-design/issues/201)) ([64b7dcd](https://github.com/bigcommerce/big-design/commit/64b7dcd))





# [0.10.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.9.0...@bigcommerce/docs@0.10.0) (2019-09-23)


### Bug Fixes

* **docs:** fix pagination docs example ([#198](https://github.com/bigcommerce/big-design/issues/198)) ([d362242](https://github.com/bigcommerce/big-design/commit/d362242))
* **docs:** temporarily remove design guideline navigation link ([#199](https://github.com/bigcommerce/big-design/issues/199)) ([836abec](https://github.com/bigcommerce/big-design/commit/836abec))


### Features

* **component:** add indeterminate state to checkboxes ([#197](https://github.com/bigcommerce/big-design/issues/197)) ([5146fdb](https://github.com/bigcommerce/big-design/commit/5146fdb))
* **docs:** end sentences with dots on pagination props ([b9effd4](https://github.com/bigcommerce/big-design/commit/b9effd4))





# [0.9.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.8.0...@bigcommerce/docs@0.9.0) (2019-09-17)


### Bug Fixes

* update GTM tag to new version ([#194](https://github.com/bigcommerce/big-design/issues/194)) ([92fa199](https://github.com/bigcommerce/big-design/commit/92fa199))


### Features

* **component:** create basic pagination component ([#188](https://github.com/bigcommerce/big-design/issues/188)) ([d79ede5](https://github.com/bigcommerce/big-design/commit/d79ede5))





# [0.8.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.7.1...@bigcommerce/docs@0.8.0) (2019-09-06)


### Features

* **docs:** add positionFixed prop to Select docs ([c133d59](https://github.com/bigcommerce/big-design/commit/c133d59))





## [0.7.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.7.0...@bigcommerce/docs@0.7.1) (2019-08-30)

**Note:** Version bump only for package @bigcommerce/docs





# [0.7.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.6.4...@bigcommerce/docs@0.7.0) (2019-08-29)


### Features

* **component:** add ability to pass arrays into input error ([#182](https://github.com/bigcommerce/big-design/issues/182)) ([eb4d4a5](https://github.com/bigcommerce/big-design/commit/eb4d4a5))





## [0.6.4](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.6.3...@bigcommerce/docs@0.6.4) (2019-08-20)

**Note:** Version bump only for package @bigcommerce/docs





## [0.6.3](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.6.2...@bigcommerce/docs@0.6.3) (2019-08-19)


### Bug Fixes

* **component:** add missing z-index to components ([#176](https://github.com/bigcommerce/big-design/issues/176)) ([800d2fc](https://github.com/bigcommerce/big-design/commit/800d2fc))
* **docs:** update Dev Blog post link ([#175](https://github.com/bigcommerce/big-design/issues/175)) ([4c93e05](https://github.com/bigcommerce/big-design/commit/4c93e05))


### BREAKING CHANGES

* **component:** `theme.zIndex` no longer has `theme.zIndex.dropdown`





## [0.6.2](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.6.1...@bigcommerce/docs@0.6.2) (2019-08-15)


### Bug Fixes

* **docs:** add missing docs for Flex/Grid ([#168](https://github.com/bigcommerce/big-design/issues/168)) ([968b0ef](https://github.com/bigcommerce/big-design/commit/968b0ef))


### Features

* **docs:** add responsive mobile header ([#165](https://github.com/bigcommerce/big-design/issues/165)) ([dca031a](https://github.com/bigcommerce/big-design/commit/dca031a))





## [0.6.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/docs@0.6.0...@bigcommerce/docs@0.6.1) (2019-08-13)


### Features

* **docs:** flatten file structure and all links ([#159](https://github.com/bigcommerce/big-design/issues/159)) ([7f7c481](https://github.com/bigcommerce/big-design/commit/7f7c481))





# 0.6.0 (2019-08-13)


### Bug Fixes

* **docs:** avatar example in Box ([#149](https://github.com/bigcommerce/big-design/issues/149)) ([a4e6cdc](https://github.com/bigcommerce/big-design/commit/a4e6cdc))
* **docs:** handle 1-liner noInline returns on CodePreview ([#154](https://github.com/bigcommerce/big-design/issues/154)) ([e125c77](https://github.com/bigcommerce/big-design/commit/e125c77))
* **docs:** restyle and rearrange sidenav ([#151](https://github.com/bigcommerce/big-design/issues/151)) ([1be86d1](https://github.com/bigcommerce/big-design/commit/1be86d1))
* **docs:** updated Getting Started copy ([8dd3054](https://github.com/bigcommerce/big-design/commit/8dd3054))
* **theme:** issue with font sizes in createTheme ([#135](https://github.com/bigcommerce/big-design/issues/135)) ([313ff46](https://github.com/bigcommerce/big-design/commit/313ff46))


### Features

* **component:** rename GlobalStyle to GlobalStyles ([#126](https://github.com/bigcommerce/big-design/issues/126)) ([e7a231e](https://github.com/bigcommerce/big-design/commit/e7a231e))
* **component:** update error state handling on form component ([#129](https://github.com/bigcommerce/big-design/issues/129)) ([e665479](https://github.com/bigcommerce/big-design/commit/e665479))
* **component:** update grid component with responsive props ([#131](https://github.com/bigcommerce/big-design/issues/131)) ([1206e60](https://github.com/bigcommerce/big-design/commit/1206e60))
* **docs:** add modal page ([16780fe](https://github.com/bigcommerce/big-design/commit/16780fe))
* **docs:** add typography documentation ([#139](https://github.com/bigcommerce/big-design/issues/139)) ([ce72cb7](https://github.com/bigcommerce/big-design/commit/ce72cb7))
* **docs:** align helpful resources ([#143](https://github.com/bigcommerce/big-design/issues/143)) ([d0214f0](https://github.com/bigcommerce/big-design/commit/d0214f0))
* **docs:** breakpoints docs ([#156](https://github.com/bigcommerce/big-design/issues/156)) ([64755bd](https://github.com/bigcommerce/big-design/commit/64755bd))
* **docs:** docs container ([#148](https://github.com/bigcommerce/big-design/issues/148)) ([5f391ba](https://github.com/bigcommerce/big-design/commit/5f391ba))
* **docs:** getting started page ([#125](https://github.com/bigcommerce/big-design/issues/125)) ([1c4fbdc](https://github.com/bigcommerce/big-design/commit/1c4fbdc))
* **docs:** panel documentation ([#137](https://github.com/bigcommerce/big-design/issues/137)) ([f748544](https://github.com/bigcommerce/big-design/commit/f748544))
* **docs:** sidenav stylings ([#123](https://github.com/bigcommerce/big-design/issues/123)) ([a428dd0](https://github.com/bigcommerce/big-design/commit/a428dd0))
* **docs:** spacing documentation ([#145](https://github.com/bigcommerce/big-design/issues/145)) ([c6756ec](https://github.com/bigcommerce/big-design/commit/c6756ec))
* **docs:** support template strings on CodePreview ([#152](https://github.com/bigcommerce/big-design/issues/152)) ([7c68580](https://github.com/bigcommerce/big-design/commit/7c68580))
* **docs:** tabs documentation ([#136](https://github.com/bigcommerce/big-design/issues/136)) ([ee75768](https://github.com/bigcommerce/big-design/commit/ee75768))
* **docs:** tooltips documentation ([#138](https://github.com/bigcommerce/big-design/issues/138)) ([5e9d129](https://github.com/bigcommerce/big-design/commit/5e9d129))
* **docs:** update Getting Started copy ([#144](https://github.com/bigcommerce/big-design/issues/144)) ([71502c7](https://github.com/bigcommerce/big-design/commit/71502c7))
* **docs:** update to use shadow props instead of elevation ([04a3dac](https://github.com/bigcommerce/big-design/commit/04a3dac))
* **docs:** update tooltip docs to new api ([2afb931](https://github.com/bigcommerce/big-design/commit/2afb931))
* **docs:** use next instead of storybook ([#122](https://github.com/bigcommerce/big-design/issues/122)) ([986ebd6](https://github.com/bigcommerce/big-design/commit/986ebd6))


### BREAKING CHANGES

* **component:** Form.Row components are renamed to Form.Group

* feat: wip input error states

* feat: improved error handling

* feat: add inline documentation to Group

* feat: rebase and fix small issues

* test: update tests for feature

* fix: update PR comments
* **component:** Changed Grid and Grid.Item props to be more verbose (e.g. areas -> gridAreas)
* **component:** `GlobalStyle` is now `GlobalStyles`
