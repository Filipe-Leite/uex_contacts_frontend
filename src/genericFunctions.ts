export function convertKeysToCamelCase(obj: any): any {
  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      return obj.map(item => convertKeysToCamelCase(item));
    } else if (obj.constructor === Object) {
      const newObj: { [key: string]: any } = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) =>
            letter.toUpperCase()
          );
          newObj[camelCaseKey] = convertKeysToCamelCase(obj[key]);
        }
      }
      return newObj;
    }
  }
  return obj;
}

export function convertKeysToSnakeCase(obj: any): any {
    if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        return obj.map(item => convertKeysToSnakeCase(item));
      } else {
        if (obj.constructor === Object) {
          const newObj: { [key: string]: any } = {};
          for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              const snakeCaseKey =
                key === 'accessToken' ? 'access-token' : key.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
              newObj[snakeCaseKey] = convertKeysToSnakeCase(obj[key]);
            }
          }
          return newObj;
        }
      }
    }
    return obj;
  }