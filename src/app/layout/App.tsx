import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { defaultTheme } from '../config/theme';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <ThemeProvider theme={createMuiTheme(defaultTheme)}>
      <CssBaseline />
      <div className="app">React App</div>
    </ThemeProvider>
  );
}

export default App;
