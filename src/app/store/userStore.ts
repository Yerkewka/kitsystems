import { observable, computed, action, runInAction } from 'mobx';
import jwt_decode from 'jwt-decode';
import { history } from '../..';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { IUser, ILoginFormInputs } from '../models/user';

export default class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;
  @observable loading = false;
  @observable loginError = false;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (data: ILoginFormInputs) => {
    if (this.loading) return;
    this.loading = true;

    try {
      const tokens = await agent.User.getToken(data);

      runInAction(() => {
        this.loading = false;
        this.loginError = false;
        this.rootStore.commonStore.setToken(tokens);
      });

      history.push('/clients');
    } catch (ex) {
      runInAction(() => {
        this.rootStore.commonStore.setToken(null);
        this.loading = false;
        this.loginError = true;
      });
    }
  };

  @action getUser = async (token: string) => {
    if (this.loading) return;
    this.loading = true;

    try {
      const decoded: any = jwt_decode(token);
      const user = await agent.User.getUser(decoded.user_id);

      runInAction(() => {
        this.loading = false;
        this.user = user;
      });
    } catch (ex) {
      runInAction(() => {
        this.loading = false;
        this.user = null;
      });
    }
  };

  @action refreshToken = async () => {
    try {
      const token = await agent.User.refreshToken(
        this.rootStore.commonStore.refreshToken!
      );

      runInAction(() => {
        this.rootStore.commonStore.setToken({
          access: token.access!,
          refresh: this.rootStore.commonStore.refreshToken!,
        });
      });
    } catch (ex) {
      runInAction(() => {
        this.rootStore.commonStore.setToken(null);
      });
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push('/');
  };
}
