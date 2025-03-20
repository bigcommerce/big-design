interface Group {
  items: unknown[];
}

export const flattenItems = <T extends Group>(groups: T[]): T['items'] =>
  groups.flatMap(({ items }) => items);
