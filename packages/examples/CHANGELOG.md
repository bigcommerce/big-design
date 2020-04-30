# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.6.1](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.6.0...@bigcommerce/examples@0.6.1) (2020-04-30)

**Note:** Version bump only for package @bigcommerce/examples





# [0.6.0](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.5.0...@bigcommerce/examples@0.6.0) (2020-04-29)

**Note:** Version bump only for package @bigcommerce/examples





# [0.5.0](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.4.2...@bigcommerce/examples@0.5.0) (2020-04-20)

**Note:** Version bump only for package @bigcommerce/examples





## [0.4.2](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.4.1...@bigcommerce/examples@0.4.2) (2020-04-13)

**Note:** Version bump only for package @bigcommerce/examples





## [0.4.1](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.4.0...@bigcommerce/examples@0.4.1) (2020-03-25)

**Note:** Version bump only for package @bigcommerce/examples





# [0.4.0](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.3.0...@bigcommerce/examples@0.4.0) (2020-03-25)

**Note:** Version bump only for package @bigcommerce/examples





# [0.3.0](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.2.0...@bigcommerce/examples@0.3.0) (2020-02-21)


### Bug Fixes

* **examples:** fix usage and add ci step ([#337](https://github.com/chanceaclark/big-design/issues/337)) ([9ade663](https://github.com/chanceaclark/big-design/commit/9ade663ad9f4d56ed10ebaf12beaed9b9c0a480d))
* **examples:** remove danling comma ([#338](https://github.com/chanceaclark/big-design/issues/338)) ([e136b7f](https://github.com/chanceaclark/big-design/commit/e136b7fe328ec73bcf9ea6e5a34bc2ce5218b512))


### Features

* **component:** convert Dropdown/Select to FC and add MultiSelect ([#303](https://github.com/chanceaclark/big-design/issues/303)) ([0ab0e50](https://github.com/chanceaclark/big-design/commit/0ab0e50878405e3da18fbf4e6dc934539a0d6446))


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





# [0.2.0](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.1.0...@bigcommerce/examples@0.2.0) (2020-02-06)


### Bug Fixes

* **examples:** use destructive actionType for buttons ([#302](https://github.com/chanceaclark/big-design/issues/302)) ([1bf028d](https://github.com/chanceaclark/big-design/commit/1bf028d618069f62077014cb27b364bbdafd34c7))





# 0.1.0 (2019-12-09)


### Bug Fixes

* **examples:** pin to correct version of bd ([8486325](https://github.com/deini/big-design/commit/8486325d46cf544283ee4b19dc8bbc24dac117d1))


### Features

* **example:** setup CodeSandbox example ([#281](https://github.com/deini/big-design/issues/281)) ([7e36d99](https://github.com/deini/big-design/commit/7e36d99c63a9544c5a02db933276d9990a8d1e1b))
