import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 76,
    backgroundColor: '#fff',
    padding: '2rem 7.2rem',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '2.4rem',
    fontWeight: 500,
    lineHeight: '2.8rem',
    letterSpacing: '0.15px',
  },
  btn: {
    textTransform: 'capitalize',
  },
}));

interface IProps {
  title: string;
  action: () => void;
}

const Header: React.FC<IProps> = ({ title, action }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h2">
        {title}
      </Typography>
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={action}
      >
        Добавить
      </Button>
    </div>
  );
};

export default Header;
