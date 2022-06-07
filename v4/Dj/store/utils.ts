import observer from './observer';
import store from './store';

export const useAtom = ({ key, initState }: { key: string; initState: any }) =>
  store.atom({ key, initState });

export const useGetState = (key: string) => store.getGlobalState(key);

export const useSetState = (key: string, newState: any) =>
  observer.update(key, newState);
