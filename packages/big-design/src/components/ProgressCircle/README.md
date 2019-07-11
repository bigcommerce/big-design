# Progress Circle

## Examples

<!-- STORY -->

<!-- SOURCE -->

---

## Description and Usage

### Determinant Progress

Determinant Progress is a known amount of time or completeness for a task to complete. For determinate progress indicators, the fill extends along the path of the indicator until the task complete.

### Indeterminant Progress

Indeterminant Progress is an unknown amount of time for a task to complete. For indeterminate progress indicators, the fill expands and contracts as it travels the length of the path until the tasks is complete.

## Props

| Prop    | Type                                             | Description          | Default       |      Required      |
| :------ | :----------------------------------------------- | :------------------- | :------------ | :----------------: |
| percent | number                                           | Sets the fill length | 0             |     :no_good:      |
| size    | xSmall \| small \| medium \| large               | Size of circle       | medium        | :white_check_mark: |
| state   | complete \| error \| incomplete \| indeterminant | Determines behavior  | indeterminant |     :no_good:      |
