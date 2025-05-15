export enum LocalStorageNames {
  Token = "token",
}

export enum Cookie {
  Auth = "auth",
}

export const setLocalStorage = (
  key: string,
  value: object | number | string | boolean
) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch (e: unknown) {
    console.error(e);
    return item;
  }
};
