import { LogGroup, LogStringEnum, LogLevelEnum } from "./interfaces";

export class LogQueue {
  private logGroupQueue: LogGroup[] = [];
  private groupIndexStack: number[] = [];
  
  constructor() {}
  
  public makeGroup(header: string, logLevel: LogStringEnum, isCollapsed: boolean): void {
    const logGroup: LogGroup = {
      isGrouped: true,
      logQueue: [],
      isCollapsed,
      logQueueHeader: header,
      style: logLevel || LogStringEnum.LOG,
      depth: this.groupIndexStack.length,
      startDate: new Date(),
      startTime: performance.now(),
    }
    this.logGroupQueue.push(logGroup);
    this.groupIndexStack.push(this.logGroupQueue.length - 1);
  }
  
  public endGroup(header?: string, logLevel?: LogStringEnum, performanceNow?: number): void {
    const idx = this.groupIndexStack.pop();
    const group = this.logGroupQueue[idx];
    if (header) {
      group.logQueueHeader = header;
    }
    if (logLevel) {
      group.style = logLevel;
    }
    group.logQueueHeader = this.getNestedGroupHeader(group.logQueueHeader, group.depth);
    group.endTime = performanceNow || performance.now();
    group.style = this.elevateGroupLevel(group);
  }
  
  /**
   * This function will get the highest log level found within a group
   */
  private elevateGroupLevel(group: LogGroup): LogStringEnum {
    return group.logQueue.reduce((acc, item) => {
      return LogLevelEnum[item.level] < LogLevelEnum[acc.level] ? item : acc;
    }, { level: group.style }).level;
  }
  
  private getNestedGroupHeader(header: string, depth: number): string {
    return ' | '.repeat(depth) + header;
  }
  
  public addToCurrentGroup(level: LogStringEnum, args: any): void {
    this.logGroupQueue[this.groupIndexStack[this.groupIndexStack.length - 1]].logQueue.push({ level, args });
  }
  
  public isQueueEmpty(): boolean {
    return !this.logGroupQueue.length;
  }
  
  public areAllGroupsEnded(): boolean {
    return !this.groupIndexStack.length;
  }
  
  public isMostRecentItemGrouped(): boolean {
    return this.logGroupQueue[this.logGroupQueue.length - 1].isGrouped;
  }
  
  public forEach(callback: Function): void {
    for (let i = 0; i < this.logGroupQueue.length; i++) {
      const group = this.logGroupQueue[i];
      callback(group);
    }
  }
  
  public clearQueue(): void {
    this.logGroupQueue = [];
  }
}
