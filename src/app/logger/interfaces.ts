export enum LogLevelEnum {
  NOLOG = -1,
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  LOG = 3,
  TIMESTAMP = 3,
  VERBOSE = 4,
}

export enum LogStringEnum {
  NOLOG = 'NOLOG',
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  LOG = 'LOG',
  TIMESTAMP = 'TIMESTAMP',
  VERBOSE = 'VERBOSE',
}

export interface LogGroup {
  isGrouped: boolean,
  isCollapsed: boolean,
  logQueue: LogQueueItem[],
  logQueueHeader: string,
  style: LogStringEnum,
  depth: number,
  startDate: Date,
  startTime: number,
  endTime?: number,
}

export interface LogQueueItem {
  level: LogStringEnum,
  args: any,
}

