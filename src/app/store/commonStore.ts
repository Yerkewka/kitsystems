import { RootStore } from './rootStore';
import { reaction, observable, action } from 'mobx';
import { ITokenResponse } from '../models/user';

export default class CommonStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.token,
      (token) => {
        if (token == null) window.localStorage.removeItem('jwt');
        else window.localStorage.setItem('jwt', token);
      }
    );

    reaction(
      () => this.refreshToken,
      (refreshToken) => {
        if (refreshToken == null) window.localStorage.removeItem('jwt-refresh');
        else window.localStorage.setItem('jwt-refresh', refreshToken);
      }
    );
  }

  @observable appLoaded = false;
  @observable token: string | null = window.localStorage.getItem('jwt');
  @observable refreshToken: string | null = window.localStorage.getItem(
    'jwt-refresh'
  );

  @action setToken = (tokens: ITokenResponse | null) => {
    this.token = tokens?.access ?? null;
    this.refreshToken = tokens?.refresh ?? null;
  };

  @action setAppLoaded = () => {
    this.appLoaded = true;
  };
}
