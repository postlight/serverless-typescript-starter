const downcaseKeys = (obj) => {
  return Reflect.ownKeys(obj).reduce((acc, k) => {
    acc[k.toLowerCase()] = obj[k];
    return acc;
  }, {})
}

export default downcaseKeys;
