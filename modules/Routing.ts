import { useRouter } from "next/router";
import { Routing } from "./Interface";

export function prefixRouting<T extends Routing>(
  prefix: string,
  routing: T
): any {
  if (prefix === "") return routing;
  const value = routing;
  if (typeof value === "function") {
    return (...args: any[]) => prefixRouting(prefix, value(...args));
  } else if (
    typeof value === "object" &&
    !Array.isArray(value) &&
    value != null
  ) {
    return Object.entries(value).reduce(
      (acc, [k, v]) => ({ ...acc, [k]: prefixRouting(prefix, v) }),
      {}
    );
  } else if (typeof value === "string") {
    const combination = `${prefix}/${value}`.replace(/\/{2,}/g, "/");
    if (combination.length > 1) {
      return combination.replace(/\/$/, "");
    }
    return combination;
  }
  throw Error("Failed to prefix routes! Unexpected format.");
}

export function createAppRouting<T extends Record<string, Routing>>(
  constructor: () => T
) {
  let routing: any;
  return new Proxy(
    {},
    {
      get: (_, prop) => {
        routing =
          routing !== null && routing !== void 0
            ? routing
            : prefixRouting("/", constructor());
        return routing[prop];
      },
    }
  ) as T;
}

export function useRouteParams<T extends string>(
  expected: T[]
): { [key in T]: string } {
  const query = useRouter().query as { [key in T]: string };
  for (const key of expected) {
    if (query[key] === undefined) {
      throw Error(`The required route param '${key}' not found.`);
    }
  }
  return query;
}
