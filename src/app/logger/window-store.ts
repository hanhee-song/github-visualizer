export class WindowStore {
  private store = {};
  
  constructor() {
    if (!(<any>window).hasOwnProperty('s')) {
      (<any>window).s = {};
    }
    
    this.store = (<any>window).s;
  }
  
  /** Adds the component to the window
   * @param component - object to add to the window
   * @return thekey in the store that maps to the component
   */
  public add(component): string {
    return this._add(component);
  }
  
  public delete(componentName: string): void {
    this._delete(componentName);
  }
  
  private _has(componentName: string): boolean {
    return this.store.hasOwnProperty(componentName);
  }
  
  private _add(component): string {
    const name = this._getComponentName(component);
    this.store[name] = component;
    return name;
  }
  
  private _delete(componentName: string): void {
    delete this.store[componentName];
  }
  
  private _getComponentName(component): string {
    const componentName = component.constructor.name;
    if (!this._has(componentName)) {
      return componentName;
    }
    for (let i = 0; i < 99; i++) {
      if (!this._has(componentName + i)) {
        return componentName + i;
      }
    }
    // this will start returning a constant string after there are more than 100 instances of a component
    // in the window store. this is to prevent whatever bizarre memory leak you're trying to
    // induce by having more than 100 components.
    return "MAX_COMPONENTS_NAME";
  }
}
