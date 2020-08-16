import React, { useState, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import { RootStoreContext } from '../../app/store/rootStore';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { yupResolver } from '@hookform/resolvers';
import loginValidatorSchema from '../../app/validators/loginValidatorSchema';

import { ILoginFormInputs } from '../../app/models/user';
import { RouteComponentProps } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  formWrapper: {
    padding: '4rem 3.4rem',
    height: '37.6rem',
    width: '39.6rem',
  },
  heading: {
    fontSize: '2.4rem',
    lineHeight: '2.8rem',
  },
  form: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    padding: '2.2rem 0',
  },
  input: {
    margin: '0.5rem 0',
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: '.15px',
    lineHeight: '2.4rem',
    mixBlendMode: 'normal',
  },
  submitBtn: {
    width: '10rem',
    marginTop: '.8rem',
    textTransform: 'uppercase',
  },
}));

interface IProps extends RouteComponentProps {}

const LoginForm: React.FC<IProps> = ({ history }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const rootStore = useContext(RootStoreContext);
  const { login, loading, isLoggedIn, loginError } = rootStore.userStore;
  if (isLoggedIn) history.push('/clients');

  const { handleSubmit, control, errors } = useForm<ILoginFormInputs>({
    resolver: yupResolver(loginValidatorSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (loginError)
      enqueueSnackbar('Неверный логин или пароль', { variant: 'error' });
  }, [loginError, enqueueSnackbar]);

  return (
    <div className={classes.root}>
      <Paper className={classes.formWrapper}>
        <Typography variant="h6" className={classes.heading}>
          Авторизация
        </Typography>
        <form onSubmit={handleSubmit(login)} className={classes.form}>
          <Controller
            as={TextField}
            name="email"
            control={control}
            className={classes.input}
            label="Email"
            defaultValue=""
            variant="outlined"
            error={!!errors.email?.message}
            helperText={errors.email?.message ?? ' '}
            fullWidth
          />
          <Controller
            as={TextField}
            name="password"
            control={control}
            className={classes.input}
            label="Пароль"
            defaultValue=""
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            error={!!errors.password?.message}
            helperText={errors.password?.message ?? ' '}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {!showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitBtn}
            disabled={loading}
          >
            Войти
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default observer(LoginForm);
