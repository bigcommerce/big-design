# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
