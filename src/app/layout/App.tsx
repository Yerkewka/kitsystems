import React, { useContext, useEffect } from 'react';
import { history } from '../../';
import { SnackbarProvider } from 'notistack';
import { observer } from 'mobx-react-lite';
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles';
import { defaultTheme } from '../config/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route } from 'react-router-dom';
import { RootStoreContext } from '../store/rootStore';
import PrivateRoute from './PrivateRoute';

import LoginForm from '../../features/user/LoginForm';
import SideBar from './Sidebar';
import Clients from '../../features/clients/Clients';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  content: {
    width: 'calc(100% - 250px)',
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser, isLoggedIn } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser(token).finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [token, getUser, setAppLoaded]);

  if (!appLoaded) return <div>Loading...</div>;

  if (!isLoggedIn) history.push('/login');

  return (
    <ThemeProvider theme={createMuiTheme(defaultTheme)}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <div className={classes.root}>
          <PrivateRoute path="*" component={SideBar} />
          <div className={classes.content}>
            <Switch>
              <Route exact path="/login" component={LoginForm} />
              <PrivateRoute exact path="/clients" component={Clients} />
            </Switch>
          </div>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default observer(App);
