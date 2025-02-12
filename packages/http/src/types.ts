import type { METHOD } from './method';
import type { STATUS_CODE, STATUS_TEXT } from './status';

export type Method = (typeof METHOD)[keyof typeof METHOD];

/** An HTTP status code. */
export type StatusCode = (typeof STATUS_CODE)[keyof typeof STATUS_CODE];

/** An HTTP status that is a informational (1XX). */
export type InformationalStatus =
  | typeof STATUS_CODE.Continue
  | typeof STATUS_CODE.SwitchingProtocols
  | typeof STATUS_CODE.Processing
  | typeof STATUS_CODE.EarlyHints;

/** An HTTP status that is a success (2XX). */
export type SuccessfulStatus =
  | typeof STATUS_CODE.OK
  | typeof STATUS_CODE.Created
  | typeof STATUS_CODE.Accepted
  | typeof STATUS_CODE.NonAuthoritativeInfo
  | typeof STATUS_CODE.NoContent
  | typeof STATUS_CODE.ResetContent
  | typeof STATUS_CODE.PartialContent
  | typeof STATUS_CODE.MultiStatus
  | typeof STATUS_CODE.AlreadyReported
  | typeof STATUS_CODE.IMUsed;

/** An HTTP status that is a redirect (3XX). */
export type RedirectStatus =
  | typeof STATUS_CODE.MultipleChoices // 300
  | typeof STATUS_CODE.MovedPermanently // 301
  | typeof STATUS_CODE.Found // 302
  | typeof STATUS_CODE.SeeOther // 303
  | typeof STATUS_CODE.UseProxy // 305 - DEPRECATED
  | typeof STATUS_CODE.TemporaryRedirect // 307
  | typeof STATUS_CODE.PermanentRedirect; // 308

/** An HTTP status that is a client error (4XX). */
export type ClientErrorStatus =
  | typeof STATUS_CODE.BadRequest
  | typeof STATUS_CODE.Unauthorized
  | typeof STATUS_CODE.PaymentRequired
  | typeof STATUS_CODE.Forbidden
  | typeof STATUS_CODE.NotFound
  | typeof STATUS_CODE.MethodNotAllowed
  | typeof STATUS_CODE.NotAcceptable
  | typeof STATUS_CODE.ProxyAuthRequired
  | typeof STATUS_CODE.RequestTimeout
  | typeof STATUS_CODE.Conflict
  | typeof STATUS_CODE.Gone
  | typeof STATUS_CODE.LengthRequired
  | typeof STATUS_CODE.PreconditionFailed
  | typeof STATUS_CODE.ContentTooLarge
  | typeof STATUS_CODE.URITooLong
  | typeof STATUS_CODE.UnsupportedMediaType
  | typeof STATUS_CODE.RangeNotSatisfiable
  | typeof STATUS_CODE.ExpectationFailed
  | typeof STATUS_CODE.Teapot
  | typeof STATUS_CODE.MisdirectedRequest
  | typeof STATUS_CODE.UnprocessableEntity
  | typeof STATUS_CODE.Locked
  | typeof STATUS_CODE.FailedDependency
  | typeof STATUS_CODE.UpgradeRequired
  | typeof STATUS_CODE.PreconditionRequired
  | typeof STATUS_CODE.TooManyRequests
  | typeof STATUS_CODE.RequestHeaderFieldsTooLarge
  | typeof STATUS_CODE.UnavailableForLegalReasons;

/** An HTTP status that is a server error (5XX). */
export type ServerErrorStatus =
  | typeof STATUS_CODE.InternalServerError
  | typeof STATUS_CODE.NotImplemented
  | typeof STATUS_CODE.BadGateway
  | typeof STATUS_CODE.ServiceUnavailable
  | typeof STATUS_CODE.GatewayTimeout
  | typeof STATUS_CODE.HTTPVersionNotSupported
  | typeof STATUS_CODE.VariantAlsoNegotiates
  | typeof STATUS_CODE.InsufficientStorage
  | typeof STATUS_CODE.LoopDetected
  | typeof STATUS_CODE.NotExtended
  | typeof STATUS_CODE.NetworkAuthenticationRequired;

/** An HTTP status that is an error (4XX and 5XX). */
export type ErrorStatus = ClientErrorStatus | ServerErrorStatus;

/** An HTTP status text. */
export type StatusText = (typeof STATUS_TEXT)[keyof typeof STATUS_TEXT];
