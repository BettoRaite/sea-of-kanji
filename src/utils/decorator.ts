/* eslint-disable @typescript-eslint/no-explicit-any */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type PromiseCallback<T> = (...args: any[]) => Promise<T>;
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type HashFn = (...args: any[]) => string;

export function asyncCachingDecorator<T>(
  cb: PromiseCallback<T>,
  hash: HashFn
): PromiseCallback<T> {
  const map = new Map<string, T>();
  return async (...args: unknown[]) => {
    const key = hash(...args);
    if (map.get(key)) {
      return map.get(key) as T;
    }
    const data = await cb(...args);
    map.set(key, data);
    return data;
  };
}
