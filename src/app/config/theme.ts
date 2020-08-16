import { ThemeOptions } from '@material-ui/core/styles';

export const defaultTheme: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#007BFF',
      contrastText: '#3D5170',
    },
    text: {
      primary: '#3D5170',
    },
    background: {
      default: '#E5E5E5',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontWeightRegular: 'normal',
    htmlFontSize: 10,
  },
  shape: {
    borderRadius: 0,
  },
  overrides: {
    MuiButton: {
      root: {
        color: '#fff',
        fontSize: '1.4rem',
        fontWeight: 500,
        letterSpacing: '1.25px',
        borderRadius: 4,
        padding: '6px 20px',
      },
      containedPrimary: {
        color: '#fff',
      },
    },
  },
};
