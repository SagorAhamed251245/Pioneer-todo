// utils/storage.ts
import Cookies from "js-cookie";

type StorageValue = string | undefined;

export const storage = {
  get: (key: string): StorageValue => Cookies.get(key),

  set: (key: string, value: string, options?: Cookies.CookieAttributes) => {
    Cookies.set(key, value, options);
  },

  remove: (key: string, options?: Cookies.CookieAttributes) => {
    Cookies.remove(key, options);
  },

  clear: () => {
    Object.keys(Cookies.get()).forEach((key) => Cookies.remove(key));
  },
};
