export interface ServeStaticOptions {
  acceptRanges?: boolean | undefined;
  cacheControl?: boolean | undefined;
  dotfiles?: string;
  etag?: boolean;
  extensions?: string[];
  fallthrough?: boolean;
  immutable?: boolean;
  index?: boolean | string | string[];
  lastModified?: boolean;
  maxAge?: number | string;
  redirect?: boolean;
  setHeaders?: (res: any, path: string, stat: any) => any;
  /**
   * Creates a virtual path prefix
   */
  prefix?: string;
}
