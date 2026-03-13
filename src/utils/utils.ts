export const pickChangedFieldsFromObjects = <T extends { [key: string]: unknown }>(
  a: T,
  b: T,
  keys: (keyof T)[]
): T => {
  const newObj: T = Object.assign({});

  for (const key of keys) {
    if (a[key] === b[key]) continue;

    newObj[key] = a[key];
  }

  return newObj;
};
