/**
 * HTTP methods as defined by RFC 9110 and RFC 5789.
 *
 * @see {@link https://www.iana.org/go/rfc9110 | RFC9110}
 * @see {@link https://www.iana.org/go/rfc5789 | RFC5789}
 */
export const METHOD = {
  /**
   * GET (Safe: yes; Idempotent: yes)
   *
   * @see {@link https://www.iana.org/go/rfc9110 | RFC9110, Section 9.3.1}
   */
  Get: 'GET',

  /**
   * HEAD (Safe: yes; Idempotent: yes)
   *
   * @see {@link https://www.iana.org/go/rfc9110 | RFC9110, Section 9.3.2}
   */
  Head: 'HEAD',

  /**
   * POST (Safe: no; Idempotent: no)
   *
   * @see {@link https://www.iana.org/go/rfc9110 | RFC9110, Section 9.3.3}
   */
  Post: 'POST',

  /**
   * PUT (Safe: no; Idempotent: yes)
   *
   * @see {@link https://www.iana.org/go/rfc9110 | RFC9110, Section 9.3.4}
   */
  Put: 'PUT',

  /**
   * DELETE (Safe: no; Idempotent: yes)
   *
   * @see {@link https://www.iana.org/go/rfc9110 | RFC9110, Section 9.3.5}
   */
  Delete: 'DELETE',

  /**
   * CONNECT (Safe: no; Idempotent: no)
   *
   * @see {@link https://www.iana.org/go/rfc9110 | RFC9110, Section 9.3.6}
   */
  Connect: 'CONNECT',

  /**
   * OPTIONS (Safe: yes; Idempotent: yes)
   *
   * @see {@link https://www.iana.org/go/rfc9110 | RFC9110, Section 9.3.7}
   */
  Options: 'OPTIONS',

  /**
   * TRACE (Safe: yes; Idempotent: yes)
   *
   * @see {@link https://www.iana.org/go/rfc9110 | RFC9110, Section 9.3.8}
   */
  Trace: 'TRACE',

  /**
   * PATCH (Safe: no; Idempotent: no)
   *
   * @see {@link https://www.iana.org/go/rfc5789 | RFC5789, Section 2}
   */
  Patch: 'PATCH',

  /**
   * ALL (Safe: unknown; Idempotent: unknown)
   *
   * Represents a wildcard for all HTTP methods.
   */
  All: 'ALL',
} as const;
