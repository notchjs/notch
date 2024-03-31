import { Status } from './status';

/** An HTTP status that is a informational (1XX). */
export type InformationalStatus =
  | typeof Status.Continue
  | typeof Status.SwitchingProtocols
  | typeof Status.Processing
  | typeof Status.EarlyHints;

/** An HTTP status that is a success (2XX). */
export type SuccessfulStatus =
  | typeof Status.OK
  | typeof Status.Created
  | typeof Status.Accepted
  | typeof Status.NonAuthoritativeInfo
  | typeof Status.NoContent
  | typeof Status.ResetContent
  | typeof Status.PartialContent
  | typeof Status.MultiStatus
  | typeof Status.AlreadyReported
  | typeof Status.IMUsed;

/** An HTTP status that is a redirect (3XX). */
export type RedirectStatus =
  | typeof Status.MultipleChoices // 300
  | typeof Status.MovedPermanently // 301
  | typeof Status.Found // 302
  | typeof Status.SeeOther // 303
  | typeof Status.UseProxy // 305 - DEPRECATED
  | typeof Status.TemporaryRedirect // 307
  | typeof Status.PermanentRedirect; // 308

/** An HTTP status that is a client error (4XX). */
export type ClientErrorStatus =
  | typeof Status.BadRequest
  | typeof Status.Unauthorized
  | typeof Status.PaymentRequired
  | typeof Status.Forbidden
  | typeof Status.NotFound
  | typeof Status.MethodNotAllowed
  | typeof Status.NotAcceptable
  | typeof Status.ProxyAuthRequired
  | typeof Status.RequestTimeout
  | typeof Status.Conflict
  | typeof Status.Gone
  | typeof Status.LengthRequired
  | typeof Status.PreconditionFailed
  | typeof Status.ContentTooLarge
  | typeof Status.URITooLong
  | typeof Status.UnsupportedMediaType
  | typeof Status.RangeNotSatisfiable
  | typeof Status.ExpectationFailed
  | typeof Status.Teapot
  | typeof Status.MisdirectedRequest
  | typeof Status.UnprocessableEntity
  | typeof Status.Locked
  | typeof Status.FailedDependency
  | typeof Status.UpgradeRequired
  | typeof Status.PreconditionRequired
  | typeof Status.TooManyRequests
  | typeof Status.RequestHeaderFieldsTooLarge
  | typeof Status.UnavailableForLegalReasons;

/** An HTTP status that is a server error (5XX). */
export type ServerErrorStatus =
  | typeof Status.InternalServerError
  | typeof Status.NotImplemented
  | typeof Status.BadGateway
  | typeof Status.ServiceUnavailable
  | typeof Status.GatewayTimeout
  | typeof Status.HTTPVersionNotSupported
  | typeof Status.VariantAlsoNegotiates
  | typeof Status.InsufficientStorage
  | typeof Status.LoopDetected
  | typeof Status.NotExtended
  | typeof Status.NetworkAuthenticationRequired;

/** An HTTP status that is an error (4XX and 5XX). */
export type ErrorStatus = ClientErrorStatus | ServerErrorStatus;
