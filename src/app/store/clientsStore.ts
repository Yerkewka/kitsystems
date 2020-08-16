import { RootStore } from './rootStore';
import { observable, action, runInAction, computed } from 'mobx';
import { IClient, IClientFormInputs } from '../models/clients';
import agent from '../api/agent';
import _, { Dictionary } from 'lodash';
import { ITableData } from '../models/table';
import { history } from '../../';

export default class ClientsStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable clients: IClient[] = [];
  @observable page: number = 1;
  @observable pageLimit: number = 10;
  @observable totalCount: number = 0;
  @observable clientsLoading = false;

  @observable editFormSending = false;
  @observable deletingElement: string | null = null;

  @computed get tableData(): ITableData {
    return {
      headers: {
        name: 'Наименование компании',
        registered_name: 'Тип юр.лица',
        region: 'Регион',
        city: 'Город',
      },
      body: (_.map(this.clients.slice(0, 10), (x) =>
        _.pick(x, ['id', 'name', 'registered_name', 'region', 'city'])
      ) as unknown) as Dictionary<string>[],
      actions: {
        edit: (id) =>
          new Promise((res, rej) => {
            res(history.push(`/clients/${id}`));
          }),
        delete: this.deleteClient,
      },
    };
  }

  @action getClients = async () => {
    if (this.clientsLoading) return;

    this.clientsLoading = true;
    try {
      const clients = await agent.Client.list(this.page, this.pageLimit);

      runInAction(() => {
        this.clientsLoading = false;
        this.totalCount = clients.count;
        this.clients = clients.results;
      });
    } catch (ex) {
      runInAction(() => {
        this.clientsLoading = false;
        this.totalCount = 0;
        this.clients = [];
      });
    }
  };

  @action editClient = async (id: string, data: IClientFormInputs) => {
    if (this.editFormSending) return;

    this.editFormSending = true;
    try {
      await agent.Client.edit(id, data);

      runInAction(() => {
        this.editFormSending = false;
        this.getClients();
      });
    } catch (ex) {
      runInAction(() => {
        this.editFormSending = false;
      });
    }
  };

  @action deleteClient = async (id: string) => {
    if (this.deletingElement !== null) return;

    try {
      await agent.Client.delete(id);

      runInAction(() => {
        this.deletingElement = null;
        this.getClients();
      });
    } catch (ex) {
      runInAction(() => {
        this.deletingElement = null;
      });
    }
  };

  @action setPage = (page: number) => {
    this.page = page;
  };

  @action setPageLimit = (pageLimit: number) => {
    this.pageLimit = pageLimit;
  };
}
