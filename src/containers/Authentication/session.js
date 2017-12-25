// @flow
import EventEmitter from 'eventemitter3';

const NAME = 'authenticateAdmin';
const eventEmitter = new EventEmitter();

export const setSession = (token: string) => {
  localStorage.setItem(NAME, token);
  eventEmitter.emit('change');
};

export const getSession = (): ?string => {
  return localStorage.getItem(NAME);
};

export const removeSession = () => {
  localStorage.removeItem(NAME);
  eventEmitter.emit('change');
};

export const onChangeSession = (listener: Function) => {
  eventEmitter.on('change', listener);
};

export const removeListenerSession = (listener: Function) => {
  eventEmitter.removeListener('change', listener);
};

export const isLoggedIn = (): boolean => {
  return !!getSession();
};
