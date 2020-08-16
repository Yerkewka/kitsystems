export interface IClientListReponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IClient[];
}

export interface IClient {
  name: string;
  id: string;
  is_owner: boolean;
  shortname: string;
  type: number | null;
  registered_type: string;
  registered_name: null | string;
  registered_size: number;
  address: null | string;
  registered_address: null | string;
  bin_iin: null | string;
  tax_payer: boolean | null;
  leader_position: null | string;
  leader: null | string;
  region: null | string;
  city: string;
  workscope: string;
  email: string;
  phone: string;
  description: null | string;
  bank_details: IBankDetail[];
  contacts: IContact[];
}

export interface IBankDetail {
  id: number;
  bank: string;
  bank_id_code: string;
  account_number: string;
  currency: ICurrency;
  company: string;
}

export enum ICurrency {
  Eur = 'eur',
  Kzt = 'kzt',
  Usd = 'usd',
}

export interface IContact {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  email: null | string;
  phone: string;
  company: string;
}

export interface IClientFormInputs {
  name: string;
  shortname: string;
  type: number;
  region: string;
  city: string;
  workscope: string;
  email: string;
  phone: string;
  description: string;
}
