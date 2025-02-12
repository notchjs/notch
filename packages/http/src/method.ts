/** HTTP Methods */
export const METHOD = {
  /** RFC9110, Section 9.3.1 */
  Get: 'GET',
  /** RFC9110, Section 9.3.3 */
  Post: 'POST',
  /** RFC9110, Section 9.3.4 */
  Put: 'PUT',
  /** RFC9110, Section 9.3.2 */
  Head: 'HEAD',
  /** RFC5789, Section 2 */
  Patch: 'PATCH',
  /** RFC9110, Section 9.3.5 */
  Delete: 'DELETE',
  /** RFC9110, Section 9.3.8 */
  Trace: 'TRACE',
  /** RFC9110, Section 9.3.6 */
  Connect: 'CONNECT',
  /** RFC9110, Section 9.3.7 */
  Options: 'OPTIONS',
} as const;
