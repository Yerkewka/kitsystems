import React, { useContext, useEffect, useState, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../app/store/rootStore';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Header from '../../app/common/header/Header';
// import ClientsFilter from './ClientsFilter';
import ClientsTable from './ClientsTable';
import ClientForm from './ClientForm';
import MuiDialog from '../../app/common/dialog/Dialog';

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
  const { getClients } = rootStore.clientsStore;

  const [formOpen, setFormOpen] = useState(true);

  useEffect(() => {
    getClients();
  }, [getClients]);

  return (
    <Fragment>
      <Header title="Клиенты" action={() => setFormOpen(true)} />
      <div className={classes.root}>
        <Paper className={classes.content} variant="outlined">
          {/* <ClientsFilter /> */}
          <ClientsTable />
          <MuiDialog
            open={formOpen}
            title={'Добавить клиента'}
            content={<ClientForm />}
            onClose={() => setFormOpen(false)}
          />
        </Paper>
      </div>
    </Fragment>
  );
};

export default observer(Clients);
