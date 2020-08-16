import { createContext } from 'react';
import { configure } from 'mobx';
import CommonStore from './commonStore';
import UserStore from './userStore';
import ClientsStore from './clientsStore';

configure({ enforceActions: 'always' });

export class RootStore {
  commonStore: CommonStore;
  userStore: UserStore;
  clientsStore: ClientsStore;

  constructor() {
    this.commonStore = new CommonStore(this);
    this.userStore = new UserStore(this);
    this.clientsStore = new ClientsStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
