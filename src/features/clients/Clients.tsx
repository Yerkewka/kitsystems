import React, { useContext, useEffect, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../app/store/rootStore';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Header from '../../app/common/header/Header';
// import ClientsFilter from './ClientsFilter';
import ClientsTable from './ClientsTable';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'auto',
    height: 'calc(100% - 76px)',
  },
  content: {
    margin: '4.5rem 6.5rem',
  },
}));

const Clients: React.FC = () => {
  const classes = useStyles();
  const rootStore = useContext(RootStoreContext);
  const { getClients, page, pageLimit } = rootStore.clientsStore;

  useEffect(() => {
    getClients();
  }, [getClients, page, pageLimit]);

  return (
    <Fragment>
      <Header title="Клиенты" action={() => {}} />
      <div className={classes.root}>
        <Paper className={classes.content} variant="outlined">
          {/* <ClientsFilter /> */}
          <ClientsTable />
        </Paper>
      </div>
    </Fragment>
  );
};

export default observer(Clients);
