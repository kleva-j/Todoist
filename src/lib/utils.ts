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
