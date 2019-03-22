let counter = 0;

export function uniqueId(prefix: string) {
  counter += 1;

  const id = counter;

  return prefix + id;
}
