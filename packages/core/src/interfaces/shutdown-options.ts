export interface ShutdownOptions {
  enabled?: boolean;
  signals?: Array<NodeJS.Signals | string>;
  graceful?: boolean;
  grace?: number;
}
