### big-design

tl;dr to develop:

```
yarn install
yarn run build
yarn run start
```

Run tests with:
```
yarn run test
```

Run linter with:
```
yarn run lint
```

### Monorepo
This is a monorepo that uses [Lerna](https://lernajs.io) and [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).

Workspaces are inside the `packages` directory.

- **big-design**: Component library
- **configs**: Shared configs between workspaces
- **storybook**: Component stories live here

### Component Requirements
- [ ] Form inputs components have to support both `controlled` and `uncontrolled` inputs. [More info](https://reactjs.org/docs/uncontrolled-components.html).

- [x] Wrappers around actionable HTML Elements (`input`, `button`, etc) must forward `ref` to the native DOM element.

- [x] Components should be [accessible](https://a11yproject.com/). Test them with [VoiceOver](https://help.apple.com/voiceover/mac) and make sure they pass all accessibility tests on the `Accessibility` tab on Storybook. We will introduce [jest-axe](https://github.com/nickcolley/jest-axe) when a couple of issues get resolved.

- [x] Form components should ensure full compatibility with form state management libraries, e.g. [Formik](https://github.com/jaredpalmer/formik).

- [x] big-design components represent generic UI elements, they are primarily used as a leaf node of trees and rarely contain state or lifecycle. We recommend using `FunctionComponent` for simple markup representation. Otherwise `PureComponent` can be used as the first alternative to benefit from the shallow comparison and avoid unnecessary rendering.

- [x] All actionable components should be targetable from tests.

- [x] Components should be done in collaboration with the design team to make sure it matches their design and behaviors.

- [x] Styled components should not be exposed or used by any other React components other than the one designed for. However, React components can use other React components. The exposed component should always provide a more comprehensive interface.

- [x] Styled components should embed the theme in `defaultProps`.

- [x] The embedded theme will provide a set of constants, helpers, and mixins representing the design system; therefore random values (_"magic numbers"_) should be avoided.

### Commit hooks
- Commit lint
- Prettier
- Tslint
