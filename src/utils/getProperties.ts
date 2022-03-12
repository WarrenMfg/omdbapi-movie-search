const getProperties = (obj: Record<string, any>, keys: string[]) => {
  const result: Record<string, any> = {};
  keys.forEach(key => (result[key] = obj[key]));
  return result;
};

export default getProperties;
