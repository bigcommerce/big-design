let counter = 0;

// TODO: Remove once all components use useUniqueId:
export function uniqueId(prefix: string) {
  counter += 1;

  const id = counter;

  return prefix + id;
}
