export const saveItemInLocalStorage = (key: string, value: string) =>
  typeof window !== 'undefined' && localStorage?.setItem(key, value);

export const getItemFromLocalStorage = (key: string) =>
  typeof window !== 'undefined' && localStorage?.getItem(key);

export const removeItemFromLocalStorage = (key: string) =>
  typeof window !== 'undefined' && localStorage?.removeItem(key);
