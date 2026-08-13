// Minimal method + path router supporting ":param" path segments.

/**
 * @typedef {object} RouteContext
 * @property {import("node:http").IncomingMessage} req
 * @property {import("node:http").ServerResponse} res
 * @property {Record<string, string>} params
 * @property {unknown} body
 */

/**
 * Split a path into non-empty segments.
 * @param {string} path
 * @returns {string[]}
 */
function split(path) {
  return path.split("/").filter(Boolean);
}

/**
 * Match a route's segments against request segments, returning captured params
 * or null when the shapes differ.
 * @param {string[]} routeSegments
 * @param {string[]} parts
 * @returns {Record<string, string> | null}
 */
function matchSegments(routeSegments, parts) {
  if (routeSegments.length !== parts.length) {
    return null;
  }
  const params = Object.create(null);
  for (let i = 0; i < routeSegments.length; i += 1) {
    const segment = routeSegments[i];
    if (segment.startsWith(":")) {
      params[segment.slice(1)] = decodeURIComponent(parts[i]);
    } else if (segment !== parts[i]) {
      return null;
    }
  }
  return params;
}

/**
 * A tiny router that resolves an (method, path) pair to a handler.
 */
export class Router {
  constructor() {
    /** @type {Array<{ method: string, segments: string[], handler: Function }>} */
    this._routes = [];
  }

  /**
   * Register a handler for a method and path pattern.
   * @param {string} method
   * @param {string} path
   * @param {(ctx: RouteContext) => Promise<void> | void} handler
   * @returns {this}
   */
  add(method, path, handler) {
    this._routes.push({ method: method.toUpperCase(), segments: split(path), handler });
    return this;
  }

  /** @param {string} path @param {Function} handler @returns {this} */
  get(path, handler) {
    return this.add("GET", path, handler);
  }

  /** @param {string} path @param {Function} handler @returns {this} */
  post(path, handler) {
    return this.add("POST", path, handler);
  }

  /** @param {string} path @param {Function} handler @returns {this} */
  delete(path, handler) {
    return this.add("DELETE", path, handler);
  }

  /**
   * Resolve a request to a handler and captured params, or null.
   * @param {string} method
   * @param {string} path
   * @returns {{ handler: Function, params: Record<string, string> } | null}
   */
  match(method, path) {
    const parts = split(path);
    const wanted = method.toUpperCase();
    for (const route of this._routes) {
      if (route.method !== wanted) {
        continue;
      }
      const params = matchSegments(route.segments, parts);
      if (params) {
        return { handler: route.handler, params };
      }
    }
    return null;
  }
}
