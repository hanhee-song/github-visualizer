import { LogLevelEnum, LogStringEnum, LogGroup } from './interfaces';
import { LogQueue } from './log-queue';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { environment } from "../../environments/environment";
import { WindowStore } from './window-store';

const DEFAULT_LOG_LEVEL = environment.production ? -1 : 4;

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private readonly logLevelSubject: Subject<number> = new Subject<number>();
  private readonly windowStore: WindowStore = new WindowStore();
  private readonly logQueue: LogQueue = new LogQueue();
  // private readonly filteredLocations: Set<string> = new Set(['LogService', 'Subscriber', 'TapSubscriber', 'MapSubscriber', 'SafeSubscriber', 'Observable', 'Array', 'Object', 'LogQueue']);
  
  private logLevel: LogLevelEnum = LogLevelEnum.LOG;
  private isIe: boolean;
  private isTest: boolean;
  
  private mostRecentLog: number;
  private groupTimeout: any;
  private groupCounter: number = 0;
  
  private readonly STYLE: any = {
    INFO: 'color: #40ad45; font-weight: 700;',
    ERROR: 'color: #f24b4b; font-weight: 700;',
    LOG: 'font-weight: 400;',
    TIMESTAMP: 'color: #888; font-weight: 400;',
    WARN: 'color: orange; font-weight: 700;',
  }

  constructor(
    // private route: ActivatedRoute
  ) {
    this.isIe = this._isIe();
    this.isTest = !!(<any>window).__karma__;
    this.logLevel = DEFAULT_LOG_LEVEL;
    
    if (this.isIe || this.isTest) {
      this.logLevel = LogLevelEnum.NOLOG;
    }
    
    // if (this.route.snapshot.queryParams.logLevel) {
    //   this.logLevel = +this.route.snapshot.queryParams.logLevel;
    // }
    
    // this.route.queryParams.subscribe(params => {
    //   if (params.logLevel) {
    //     this.setLogLevel(+params.logLevel);
    //   }
    // });
    
    this.setLogLevel(this.logLevel);
  }
  
  /**
   * Wrapper for console.log(). Requires logLevel <= 3
   */
  public log(...args: any[]): void {
    this._queueItem(LogStringEnum.LOG, ...args);
  }
  
  /**
   * Wrapper for console.log(). Requires logLevel <= 3
   */
  public info(...args: any[]): void {
    this._queueItem(LogStringEnum.INFO, ...args);
  }
  
  /**
   * Wrapper for console.log(). Requires logLevel <= 3
   */
  public warn(...args: any[]): void {
    this._queueItem(LogStringEnum.WARN, ...args);
  }
  
  /**
   * Wrapper for console.log(). Requires logLevel <= 3
   */
  public error(...args: any[]): void {
    this._queueItem(LogStringEnum.ERROR, ...args);
  }

  /** Wrapper for console.group(). Starts a new uncollapsed group to be logged
   * @param header - header of group
   * @param logLevel - logLevel ranging from NOLOG (-1) to VERBOSE (4). Default is LOG(3). Gorups will be hidden if they and their children's log levels are below the threshold
   */
  public group(header?: string, logLevel?: LogStringEnum): void {
    this.logQueue.makeGroup(header || '', logLevel || LogStringEnum.LOG, false);
  }

  /** Wrapper for console.group(). Starts a new uncollapsed group to be logged
   * @param header - header of group
   * @param logLevel - logLevel ranging from NOLOG (-1) to VERBOSE (4). Default is LOG(3). Gorups will be hidden if they and their children's log levels are below the threshold
   */
  public groupCollapsed(header?: string, logLevel?: LogStringEnum): void {
    this.logQueue.makeGroup(header || '', logLevel || LogStringEnum.LOG, true);
  }
  
  public groupEnd(header?: string, logLevel?: LogStringEnum, performanceNow?: number): void {
    this.logQueue.endGroup(header, logLevel, performanceNow);
    if (this.logQueue.areAllGroupsEnded()) {
      this.logQueue.forEach((logGroup: LogGroup) => {
        this._logGroup(logGroup);
      });
      this.logQueue.clearQueue();
    }
  }
  
  public setLogLevel(level: number) {
    if ([-1, 0, 1, 2, 3, 4].includes(level)) {
      this.logLevel = level;
    } else {
      this.logLevel = LogLevelEnum.WARN;
    }
    if (!this.isTest) {
      !this.isIe
        ? console.warn('%Log level is now ' + this.logLevel, this.STYLE.ERROR)
        : console.warn('Log level is now ' + this.logLevel);
    }
    this.logLevelSubject.next(this.logLevel);
  }
  
  public getLogLevel(): number {
    return this.logLevel;
  }
  
  public getLogLevelSubject(): Subject<number> {
    return this.logLevelSubject;
  }
  
  public getWindowStore(): WindowStore {
    return this.windowStore;
  }
  
  private _logItem(level: LogStringEnum, isGrouped: boolean, args: any[]): void {
    if (this.logLevel >= LogLevelEnum[level]) {
      this._groupBasedOnTime();
      
      if (isGrouped) {
        !this.isIe
          ? console.group('%c' + args[0] + '%c - ' + this._getLogDateTimeString(), this.STYLE[level], this.STYLE.TIMESTAMP)
          : console.group(args[0] + ' - ' + this._getLogDateTimeString());
        for (let i = 0; i < args.length; i++) {
          const element = args[i];
          console[level.toLocaleLowerCase()](element);
        }
        console.groupEnd();
      } else {
        if (level.toLocaleLowerCase() === 'info') {
          !this.isIe
            ? console.log('%c' + args[0], this.STYLE[level], ...args.slice(1))
            : console.log(...args);
        } else {
          console[level.toLocaleLowerCase()](...args);
        }
      }
    }
  }
  
  private _queueItem(level: LogStringEnum, ...args: any[]): void {
    if (this.logQueue.isQueueEmpty() || !this.logQueue.isMostRecentItemGrouped()) {
      const isGrouped = args.length > 1;
      this._logItem(level, isGrouped, args);
    } else {
      this.logQueue.addToCurrentGroup(level, args);
    }
  }
  
  private _logGroup(group: LogGroup): void {
    const action: string = group.style;
    if (this.logLevel > LogLevelEnum[action] || this._isGroupLoggable(group)) {
      this._groupBasedOnTime();
      const consoleGroup: Function = group.isCollapsed ? console.groupCollapsed : console.group;
      const timeDiff = Math.round((group.endTime - group.startTime) * 10) / 10;
      const timeString = this._getLogDateTimeString(group.startDate) + ' (' + timeDiff + ' ms)';
      !this.isIe
        ? consoleGroup('%c' + group.logQueueHeader + '%c - ' + timeString, this.STYLE[group.style], this.STYLE.TIMESTAMP)
        : consoleGroup(group.logQueueHeader + ' - ' + timeString);
      group.logQueue.forEach(item => {
        this._logItem(item.level, false, item.args);
      });
      console.groupEnd();
    }
  }
  
  private _isGroupLoggable(group: LogGroup): boolean {
    for (let i = 0; i < group.logQueue.length; i++) {
      const itemAction: string = group.logQueue[i][0];
      if (this.logLevel >= LogLevelEnum[itemAction]) {
        return true;
      }
    }
    return false;
  }
  
  private _getLogDateTimeString(date?: Date): string {
    return format(date ? date : new Date(), 'HH:mm:ss.SSS');
  }
  
  private _groupBasedOnTime(): void {
    const now = new Date();
    const ms = now.getTime();
    if (!this.mostRecentLog || this.mostRecentLog + 200 < ms) {
      console.groupEnd();
      this.groupCounter++;
      !this.isIe
        ? console.group('[  ' + this.groupCounter + '  ]' + '%c' + this._getLogDateTimeString(now), this.STYLE.TIMESTAMP)
        : console.group('[  ' + this.groupCounter + '  ]' + this._getLogDateTimeString(now));
      clearTimeout(this.groupTimeout);
    }
    this.mostRecentLog = ms;
  }
  
  private _isIe(): boolean {
    const ua = window.navigator.userAgent;
    return ~ua.indexOf('MSIE ') || ~ua.indexOf('Trident/') ? true : false;
  }
}
