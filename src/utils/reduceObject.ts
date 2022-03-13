/**
 * Shallowly reduce an object to only the properties (keys) provided
 */
const reduceObject = (obj: Record<string, any>, keys: string[]) =>
  keys.reduce((acc, cur) => {
    acc[cur] = obj[cur];
    return acc;
  }, {} as Record<string, any>);

export default reduceObject;
