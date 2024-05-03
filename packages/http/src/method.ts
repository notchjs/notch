/** Representation of HTTP methods. */
export enum Method {
  /** The `GET` variant */
  Get = 0,
  /** The `POST` variant */
  Post,
  /** The `PUT` variant */
  Put,
  /** The `HEAD` variant */
  Head,
  /** The `PATCH` variant */
  Patch,
  /** The `DELETE` variant */
  Delete,
  /** The `TRACE` variant */
  Trace,
  /** The `CONNECT` variant */
  Connect,
  /** The `OPTIONS` variant */
  Options,
}

/** Returns the string representation of HTTP methods. */
export const METHOD_TEXT: Readonly<Record<Method, string>> = {
  [Method.Get]: 'GET',
  [Method.Post]: 'POST',
  [Method.Put]: 'PUT',
  [Method.Head]: 'HEAD',
  [Method.Patch]: 'PATCH',
  [Method.Delete]: 'DELETE',
  [Method.Trace]: 'TRACE',
  [Method.Connect]: 'CONNECT',
  [Method.Options]: 'OPTIONS',
} as const;
