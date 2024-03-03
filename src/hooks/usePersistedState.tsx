import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PersistedState<T> = [T, Dispatch<SetStateAction<T>>];

export default function usePersistedState<T>(
  defaultValue: T,
  key: string
): PersistedState<T> {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      // Avoiding accessing windows on SSR
      const value = window?.localStorage.getItem(key);

      return value ? (JSON.parse(value) as T) : defaultValue;
    }
    return defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
