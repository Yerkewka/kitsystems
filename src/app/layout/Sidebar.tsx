import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router-dom';
import { RootStoreContext } from '../store/rootStore';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    height: '100%',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    padding: '3rem 0',
    zIndex: 1,
  },
  logo: {
    width: 169,
    height: 52,
    margin: '0 0 3rem 3.5rem',
    display: 'block',
  },
  listItemText: {
    fontSize: '1.4rem',
    fontWeight: 500,
    lineHeight: '2.4rem',
  },
  selected: {
    backgroundColor: 'rgba(0, 123, 255, 0.41)',
    color: 'rgba(0, 0, 0, 0.87)',
    '&:hover': {
      backgroundColor: 'rgba(0, 123, 255, 0.6)',
    },
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const rootStore = useContext(RootStoreContext);
  const { logout } = rootStore.userStore;

  return (
    <div className={classes.root}>
      <img src="/assets/svg/logo.svg" className={classes.logo} alt="logo" />
      <List component="nav" aria-label="navigation">
        <Link
          to="/clients"
          component={RouterLink}
          color="inherit"
          underline="none"
        >
          <ListItem button className={classes.selected}>
            <ListItemIcon>
              <AssignmentIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Клиенты" />
          </ListItem>
        </Link>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon style={{ color: '#BB1C1C' }} />
          </ListItemIcon>
          <ListItemText primary="Выход" style={{ color: '#BB1C1C' }} />
        </ListItem>
      </List>
    </div>
  );
};

export default observer(Sidebar);
