import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { parseDate } from "chrono-node";

/**
 * A strongly-typed version of `clsx` and `twMerge`, which merges multiple class names together.
 * @param inputs - A variable number of class names (as strings or arrays of strings) to merge together.
 * @returns A single string containing all the class names, separated by spaces.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Utility function that parses dates.
 * Parses a given date string using the `chrono-node` library.
 *
 * @param str - A string representation of a date and time.
 * @returns A `Date` object representing the parsed date and time, or `null` if the string could not be parsed.
 */
export const parseDateTime = (str: Date | string) => {
  if (str instanceof Date) return str;
  return parseDate(str);
};

/**
 * Converts a given timestamp or the current date and time to a string representation in the local time zone.
 * format: `HH:mm`, adjusted for the local time zone.
 *
 * @param timestamp {Date | string}
 * @returns A string representation of the timestamp
 */
export const getDateTimeLocal = (timestamp?: Date): string => {
  const d = timestamp ? new Date(timestamp) : new Date();
  if (d.toString() === "Invalid Date") return "";
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .split(":")
    .slice(0, 2)
    .join(":");
};

/**
 * Formats a given date and time object or string into a human-readable string representation.
 * "MMM D, YYYY h:mm A" (e.g. "Jan 1, 2023 12:00 PM").
 *
 * @param datetime - {Date | string}
 * @returns A string representation of the date and time
 */
export const formatDateTime = (datetime: Date | string) => {
  return new Date(datetime).toLocaleTimeString("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

/**
 * Waits for a given condition to be true and resolves when it is.
 *
 * @param conditionFn - A function that returns a boolean indicating whether the condition is true.
 * @param ms - The amount of time to wait between checks.
 * @returns A promise that resolves when the condition is true.
 */
export const waitFor = (
  conditionFn: () => boolean,
  ms: number = 100
): Promise<void> => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (conditionFn()) {
        clearInterval(interval);
        resolve();
      }
    }, ms);
  });
};

/**
 * Converts a string to sentence case.
 *
 * @param str - The string to convert
 * @returns The string in sentence case
 */
export function toSentenceCase(str: string): string {
  return str
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Groups an array of objects by the value of a given key.
 *
 * @param collection - The array of objects to group.
 * @param key - The key to group by.
 * @returns An object with the values of the key as keys and an array of objects with that value as the value.
 *
 * @example
 * const users = [
 *   { name: 'John', age: 25 },
 *   { name: 'Jane', age: 25 },
 *   { name: 'Bob', age: 30 },
 * ];
 * const groupedUsers = groupBy(users, 'age');
 * // groupedUsers is { '25': [{ name: 'John', age: 25 }, { name: 'Jane', age: 25 }], '30': [{ name: 'Bob', age: 30 }] }
 */
export function groupByKey<
  T extends Record<string, unknown>,
  K extends keyof T,
>(collection: T[], key: K): Record<string, T[]> {
  return collection.reduce(
    (map, item) => {
      const value = String(item[key]);
      (map[value] || (map[value] = [])).push(item);
      return map;
    },
    {} as Record<string, T[]>
  );
}

export function groupBy<T, K extends keyof T | (string | number | symbol)>(
  collection: T[],
  cb: (item: T) => K
): Record<string, T[]> {
  return collection.reduce(
    (map, item) => {
      const value = cb(item);
      (map[value] || (map[value] = [])).push(item);
      return map;
    },
    {} as Record<K, T[]>
  );
}
