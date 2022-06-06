type FuncType = () => void;

interface IAtomStore {
  state: Record<string, any>;
  observers: Set<FuncType>;
}

class Store {
  globalState: Record<string, IAtomStore>;

  constructor() {
    this.globalState = {};
  }

  atom({ key, initState }: { key: string; initState: Record<string, any> }) {
    if (Object.prototype.hasOwnProperty.call(this.globalState, key))
      throw Error('중복 키');


    this.globalState[key] = {
      state: initState,
      observers: new Set(),
    };

    return key;
  }

  getGlobalState(key: string) {
    return this.globalState[key].state;
  }

  setGlobalState(key: string, newState: Record<string, any>) {
    this.globalState[key].state = {
      ...this.globalState[key].state,
      ...newState,
    };
  }

  getObservers(key: string) {
    return this.globalState[key].observers;
  }

  resetObservers(key: string) {
    this.globalState[key].observers = new Set();
  }
}

export default new Store();
