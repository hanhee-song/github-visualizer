import { Subject, Subscription } from "rxjs";
import { LogService } from "./log.service";
import { isEqual, cloneDeep } from 'lodash';
import { LogStringEnum } from "./interfaces";

const SUBJECTS = Symbol('subjects'),
  LOG_LEVEL_SUB = Symbol('logLevelSub'),
  WINDOW_STORE_NAME = Symbol('windowStoreName'),
  IS_DESTROY_WRAPPED = Symbol('isDestroyWrapped'),
  IS_COMPONENT_WRAPPED = Symbol('isComponentWrapped'),
  IS_PROTOTYPE_WRAPPED = Symbol('isPrototypeWrapped'),
  WRAPPED_FUNCTIONS = Symbol('wrappedFunctions'),
  NG_ON_DESTROY = Symbol('ngOnDestroy')

const INVALID_KEYS: Set<string> = new Set(['Observable', 'Router', 'User', 'ElementRef']);

interface Prototype {
  [WRAPPED_FUNCTIONS]: { [name: string]: Function };
  [IS_PROTOTYPE_WRAPPED]: boolean;
  [NG_ON_DESTROY]: Function;
  [IS_DESTROY_WRAPPED]: boolean;
  ngOnDestroy: Function;
}

interface Component {
  [SUBJECTS]: Subject<any>[];
  [LOG_LEVEL_SUB]: Subscription;
  [IS_COMPONENT_WRAPPED]: boolean;
  [WINDOW_STORE_NAME]: string;
  ngOnDestroy: Function;
  __proto__: Prototype;
}

export abstract class LogWrapper implements Component {
  [SUBJECTS]: Subject<any>[] = [];
  [LOG_LEVEL_SUB]: Subscription;
  [IS_COMPONENT_WRAPPED]: boolean = false;
  [WINDOW_STORE_NAME]: string;
  __proto__: Prototype;
  
  static logService: LogService;
  
  protected constructor(
    protected logService: LogService
  ) {
    if (!LogWrapper.logService) {
      LogWrapper.logService = logService;
    }
    LogWrapper.checkLogLevel(+LogWrapper.logService.getLogLevel(), this);
    const prototype = this.__proto__;
    
    this[LOG_LEVEL_SUB] = LogWrapper.logService.getLogLevelSubject()
      .subscribe(logLevel => {
        LogWrapper.checkLogLevel(logLevel, this);
      });
    LogWrapper._wrapProtoNgOnDestroy(prototype);
  }
  
  abstract ngOnDestroy();
  
  private static checkLogLevel(level: number, component: Component): void {
    const prototype = component.__proto__;
    if (level >= 4) {
      this._addToWindowStore(component);
      this._wrapComponent(component, prototype);
      this._wrapPrototype(prototype);
    } else {
      this._deleteFromWindowStore(component);
      this._unwrapComponent(component, prototype);
      this._unwrapPrototype(prototype);
    }
  }
  
  private static _addToWindowStore(component: Component): void {
    if (!component[WINDOW_STORE_NAME]) {
      component[WINDOW_STORE_NAME] = LogWrapper.logService.getWindowStore().add(component);
    }
  }
  
  private static _deleteFromWindowStore(component: Component): void {
    if (component[WINDOW_STORE_NAME]) {
      LogWrapper.logService.getWindowStore().delete(component[WINDOW_STORE_NAME]);
      delete component[WINDOW_STORE_NAME];
    }
  }
  
  private static _wrapComponent(component: Component, prototype: Prototype): void {
    if (!component[IS_COMPONENT_WRAPPED]) {
      this._wrapComponentSubjectsAfterInit(component);
      this._wrapComponentNgOnDestroy(component, prototype);
      component[IS_COMPONENT_WRAPPED] = true;
    }
  }
  
  private static _unwrapComponent(component: Component, prototype: Prototype): void {
    if (component[IS_COMPONENT_WRAPPED]) {
      this._unwrapComponentNgOnDestroy(component, prototype);
      this._unwrapComponentSubjects(component);
      component[IS_COMPONENT_WRAPPED] = false;
    }
  }
  
  private static _wrapPrototype(prototype: Prototype): void {
    if (!prototype[IS_PROTOTYPE_WRAPPED]) {
      LogWrapper.logService.info('Wrapping prototype ' + prototype.constructor.name);
      prototype[WRAPPED_FUNCTIONS] = {};
      for (const key in prototype) {
        if (prototype.hasOwnProperty(key)
            && key !== 'constructor'
            && key !== 'ngOnDestroy'
            && key.slice(0, 2) !== '__'
            && typeof prototype[key] === 'function') {
          const oldFunction = prototype[key];
          prototype[WRAPPED_FUNCTIONS][key] = oldFunction;
          prototype[key] = this.wrappedFunction(key, prototype);
        }
      }
      prototype[IS_PROTOTYPE_WRAPPED] = true;
    }
  }
  
  public static wrappedFunction(functionName: string, prototype: Prototype): Function {
    return function(...args) {
      let error,
        returnValue;
      
      // handle possibility of losing scope
      if (!this[WINDOW_STORE_NAME]) {
        console.error.arguments(`function ${functionName} on prototype ${prototype.constructor.name} was executed out of scope. Consider binding the function to 'this'.`);
        return;
      }
      
      const before = LogWrapper._cloneClean(this);
      LogWrapper.logService.groupCollapsed();
      try {
        returnValue = prototype[WRAPPED_FUNCTIONS][functionName].bind(this)(...args);
      } catch (e) {
        error = e;
      }
      
      const endTime = performance.now();
      LogWrapper.logService.log('  Args:', args);
      const numberOfDiffs = LogWrapper._logDiffs(before, this);
      
      if (error) {
        LogWrapper.logService.error(error);
      } else {
        LogWrapper.logService.log('Return:', returnValue);
      }
      
      const logString = this._getHeaderName(functionName);
        + ' (changes - ' + numberOfDiffs + ')'
        + (returnValue !== undefined ? ' (return ' + LogWrapper._getTypeOfValue(returnValue) + ')' : '');
      
      LogWrapper.logService.groupEnd(logString, error ? LogStringEnum.ERROR : LogStringEnum.LOG, endTime);
      
      if (!error) {
        return returnValue;
      }
    }
  }
  
  private static _logDiffs(before: any, current: any): number {
    const after = LogWrapper._cloneClean(current);
    const keysWithStateChanges = LogWrapper._getKeysWithStateChanges(before, after);
    if (keysWithStateChanges.length) {
      const beforeObj = LogWrapper._getSubsetOfObjectByKeys(before, keysWithStateChanges);
      const afterObj = LogWrapper._getSubsetOfObjectByKeys(after, keysWithStateChanges);
      LogWrapper.logService.log('Before:', beforeObj);
      LogWrapper.logService.log(' After:', afterObj);
    }
    return keysWithStateChanges.length;
  }
  
  private _getHeaderName(key: string): string {
    return this.constructor.name + ' ' + key;
  }
  
  private static _unwrapPrototype(prototype: Prototype): void {
    if (prototype[IS_PROTOTYPE_WRAPPED]) {
      const wrappedFunctions = prototype[WRAPPED_FUNCTIONS];
      for (const key in wrappedFunctions) {
        if (wrappedFunctions.hasOwnProperty(key)) {
          prototype[key] = wrappedFunctions[key];
          
        }
      }
      prototype[WRAPPED_FUNCTIONS] = {};
      prototype[IS_PROTOTYPE_WRAPPED] = false;
    }
  }
  
  private static _getKeysWithStateChanges(obj1: any, obj2: any): string[] {
    const diffs = [];
    for (const key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        if (!isEqual(obj1[key], obj2[key]))
        diffs.push(key);
      }
    }
    return diffs;
  }
  
  private static _getSubsetOfObjectByKeys(obj: any, keys: string[]): object {
    const subsetOfObj = {};
    for (let i = 0; i < keys.length; i++) {
      subsetOfObj[keys[i]] = obj[keys[i]];
    }
    return subsetOfObj;
  }
  
  private static _cloneClean(obj: any): object {
    const clone = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        if (element === undefined
            || element === null
            || (
              element.constructor.name.slice(element.constructor.name.length - 7) !== 'Service'
              && !INVALID_KEYS.has(element.constructor.name)
              && !LogWrapper._hasFunction(element)
        )) {
          clone[key] = cloneDeep(element);
        }
        
      }
    }
    return clone;
  }
  
  private static _hasFunction(obj: any): boolean {
    if (typeof obj === 'function') {
      return true;
    }
    if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && typeof obj[key] === 'function') {
          return true;
        }
      }
    }
    return false;
  }
  
  private static _wrapComponentSubjectsAfterInit(component: Component): void {
    setTimeout(() => {
      for (const key in component) {
        if (component.hasOwnProperty(key)) {
          const element = component[key];
          if (this._isSubject(element)) {
            const sub = element.subscribe((data) => {
              LogWrapper.logService.groupCollapsed((<any>component)._getHeaderName(key) + ' (next)' + (data !== undefined ? ', (new data)' : ''), LogStringEnum.TIMESTAMP);
              LogWrapper.logService.log('Args: ', data);
              LogWrapper.logService.groupEnd();
            });
            component[SUBJECTS].push(sub);
          }
        }
      }
    }, 0);
  }
  
  private static _unwrapComponentSubjects(component: Component): void {
    if (component[SUBJECTS] && component[SUBJECTS].length) {
      for (let i = 0; i < component[SUBJECTS].length; i++) {
        const sub = component[SUBJECTS][i];
        sub.unsubscribe();
      }
    }
    component[SUBJECTS] = [];
  }
  
  // hook onto ngOnDestroy to unsub from logLevelSub
  private static _wrapProtoNgOnDestroy(prototype: Prototype): void {
    // hook onto proto destroy
    if (prototype[IS_DESTROY_WRAPPED]) {
      return;
    }
    if (prototype.ngOnDestroy) {
      prototype[IS_DESTROY_WRAPPED] = true;
      const oldDestroy = prototype.ngOnDestroy;
      prototype[NG_ON_DESTROY] = oldDestroy;
      prototype.ngOnDestroy = function() {
        this[LOG_LEVEL_SUB].unsubscribe();
        prototype[NG_ON_DESTROY].apply(this);
      }
    }
  }
  
  private static _wrapComponentNgOnDestroy(component: Component, prototype: Prototype): void {
    if (prototype.ngOnDestroy) {
      component.ngOnDestroy = function() {
        LogWrapper.logService.getWindowStore().delete(this[WINDOW_STORE_NAME]);
        prototype.ngOnDestroy.apply(this);
      }
    }
  }
  
  private static _unwrapComponentNgOnDestroy(component: Component, prototype: Prototype): void {
    if (prototype.ngOnDestroy && component.hasOwnProperty('ngOnDestroy')) {
      delete component.ngOnDestroy;
    }
  }
  
  private static _isSubject(element: any): boolean {
    return element && element.constructor && element.constructor.name === 'Subject';
  }
  
  private static _getTypeOfValue(element: any): string {
    if (element && element.constructor && element.constructor.name) {
      return element.constructor.name;
    } else {
      return typeof element;
    }
  }
}
