import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import MuiTable from '../../app/common/table/MuiTable';
import { RootStoreContext } from '../../app/store/rootStore';

const ClientsTable: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    tableData,
    totalCount,
    page,
    pageLimit,
    setPage,
    setPageLimit,
  } = rootStore.clientsStore;

  return (
    <MuiTable
      data={tableData}
      pagination={{
        count: totalCount,
        page,
        rowsPerPage: pageLimit,
        handleChangePage: (e, p) => setPage(p),
        handleChangeRowsPerPage: (e) => setPageLimit(parseInt(e.target.value)),
      }}
    />
  );
};

export default observer(ClientsTable);
