# Contributing to BigDesign

Before contributing please read the [Code of Conduct](https://github.com/bigcommerce/big-design/blob/main/CODE_OF_CONDUCT.md) as we expect all participants to adhere to it.

## Issues / Bugs

If you have a question, issue, or bug, you can open a Github issue. First, make sure to follow these instructions:

1. Ensure the bug was not already reported by searching on GitHub under Issues within the BigDesign repo.
2. If you're unable to find an open issue addressing the problem, open a new one. (Instructions [here](https://help.github.com/en/articles/creating-an-issue)). Be sure to include a title and clear description, and as much relevant information as possible. If possible, use the relevant template to create the issue. If none of the templates match your issue, open a regular issue. Currently supported templates are:
* **Bug report**: For situations in which you are experiencing an error with the library or a component itself. Expected functionality is [specified per component and design guidelines are available](https://developer.bigcommerce.com/big-design/).
	* Please include details to replicate the issue, including environment, OS, and any exceptions/backtraces
	* Include a code sample or an executable test case demonstrating the expected behavior that is not occurring when possible
* **Feature / Improvement Request**: For situations in which the library or a component are working as expected, but you desire additional functionality. This is the appropriate template for requesting new components.
* **Question**: For situations in which you need help from the BigCommerce engineering team, regarding guidance on using the BigDesign library, specific components, or other issues.

## New Features/Changes

Before you put signifcant effort into a new feature or API changes, make sure you have [filed an issue](https://github.com/bigcommerce/big-design/issues/new?assignees=&labels=&template=feature---improvement-request.md&title=). This allows us to have a conversation around the subject and come to an agreement around the proposed solution.

If your change just fixes a bug, you can submit a pull request but ensure there is a [bug issue](https://github.com/bigcommerce/big-design/issues/new?assignees=&labels=&template=bug_report.md&title=) attached to your pull request.

## Your First Pull Request

A good first place to start is our list of [good first issues](https://github.com/bigcommerce/big-design/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22).

Once you are ready to start working on an issue, follow steps in **[Opening a Pull Request](#opening-a-pull-request)** and **[Development Workflow](https://github.com/bigcommerce/big-design/blob/main/README.md#development)**.

## Opening a Pull Request

The core team will be monitoring for new pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation, within a timely manner.

**Before submitting a pull request,** please make sure the following is done:
1. Fork the repository and ensure you branch from `main`.
2. Install dependencies using `pnpm install`.
3. Tests should be added/updating to reflect changes.
4. Ensure the test suite passes (`pnpm test`).
5. Check that the repository builds (`pnpm build`).
6. Make sure that your code is linted thoroughly (`pnpm lint`. Tip: `pnpm lint-staged` will lint staged files.
7. Fill out the pull request template as needed.

## License

By contributing to BigDesign, you agree that your contributions will be licensed under our [license](https://github.com/bigcommerce/big-design/blob/main/LICENSE.md).
