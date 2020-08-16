import { Dictionary } from 'lodash';

export interface ITableData {
  headers: Dictionary<string>;
  body: Dictionary<string>[];
  actions?: ITableActions;
}

export interface ITableActions {
  edit?: (id: string) => Promise<void>;
  delete?: (id: string) => Promise<void>;
}

export interface IPagination {
  page: number;
  rowsPerPage: number;
  count: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
