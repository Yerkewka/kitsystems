import axios, { AxiosResponse } from 'axios';
import { history } from '../../index';
import { ILoginFormInputs, ITokenResponse, IUser } from '../models/user';
import { IClientListReponse, IClientFormInputs } from '../models/clients';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (cfg) => {
    const token = window.localStorage.getItem('jwt');
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === 'Network error' && !error.response) {
    // TODO: Notify
  }

  if (error.response) {
    const { config, status } = error.response;

    if (status === 401) {
      const refreshToken = window.localStorage.getItem('jwt-refresh');
      if (refreshToken !== null) {
      }
    }

    if (status === 404 && config.method === 'get') {
      history.push('/notfound');
    }
  }

  throw error.response;
});

// const sleep = (ms: number) => (response: AxiosResponse) =>
//   new Promise<AxiosResponse>(resolve =>
//     setTimeout(() => resolve(response), ms)
//   );

const responseBody = (response: AxiosResponse) => response?.data;

const requests = {
  get: (url: string) =>
    axios
      .get(url)
      // .then(sleep(1000))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      // .then(sleep(1000))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      // .then(sleep(1000))
      .then(responseBody),
  delete: (url: string) =>
    axios
      .delete(url)
      // .then(sleep(1000))
      .then(responseBody),
};

const User = {
  getToken: (data: ILoginFormInputs): Promise<ITokenResponse> =>
    requests.post('/token/', data),
  refreshToken: (token: string): Promise<Partial<ITokenResponse>> =>
    requests.post('/token/refresh/', { refresh: token }),
  getUser: (id: string): Promise<IUser> => requests.get(`/users/${id}`),
};

const Client = {
  list: (page: number, pageLimit: number): Promise<IClientListReponse> =>
    requests.get(`/companies/?page=${page}&pageLimit=${pageLimit}`),
  edit: (id: string, body: IClientFormInputs) =>
    requests.put(`/companies/${id}`, body),
  delete: (id: string) => requests.delete(`/companies/${id}`),
};

export default {
  User,
  Client,
};
