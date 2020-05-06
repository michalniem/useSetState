export const isFunction = (param) => param instanceof Function;

export const isPlainObject = (param) =>
  Object.prototype.toString.call(param) === "[object Object]";