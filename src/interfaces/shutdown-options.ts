export interface ShutdownOptions {
  /**
   * Whether to enable shutdown by listening for termination signal.
   *
   * **default: false**
   */
  enabled?: boolean;

  /**
   * On Unix, A set of signal which trigger a shutdown. On non-Unix, this
   * option has limited support due to inherent platform limitations.
   *
   * **default: [`SIGTERM`]**
   */
  signals?: Array<NodeJS.Signals | string>;

  /**
   * Whether server should support graceful shutdown, allowing active requests
   * time to complete.
   *
   * **default: false**
   */
  graceful?: boolean;

  /**
   * The grace period: number of milliseconds to continue to try to finish
   * outstanding http server I/O before forcibly terminating it.
   *
   * Defaults to Infinity (don't force-close). If you want to immediately
   * destroy all sockets set its value to `0`.
   *
   * See {@link https://www.npmjs.com/package/stoppable | stoppable}
   */
  grace?: number;

  /**
   * The mercy period: number of milliseconds to continue to try to finish
   * each registered shutdown hook before forcibly terminating it.
   *
   * Default: not set (don't force-terminate).
   */
  mercy?: number;
}
