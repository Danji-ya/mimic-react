import store from './store';

type FuncType = () => void;

class Observer {
  subscribe(key: string, observer: FuncType) {
    const observers = store.getObservers(key);
    observers.add(observer);
  }

  unsubscribe(key: string, observer: FuncType) {
    const observers = store.getObservers(key);
    observers.delete(observer);
  }

  notify(key: string) {
    const observers = store.getObservers(key);
    observers.forEach((observer: FuncType) => observer());
  }

  update(key: string, newState: Record<string, any>) {
    store.setGlobalState(key, newState);
    this.notify(key);
  }
}

export default new Observer();
