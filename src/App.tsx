import { useMemo, useState } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider, createTheme, type PaletteMode } from '@mui/material/styles';
import { ThemeProvider as LegacyThemeProvider } from '@mui/styles';
import Cocktail from './components/cocktail/Cocktail';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const handleToggleTheme = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#29d3a6' : '#117a65',
          },
          secondary: {
            main: mode === 'dark' ? '#7ecbff' : '#0b5cad',
          },
          background: {
            default: mode === 'dark' ? '#0b1220' : '#f3f6fb',
            paper: mode === 'dark' ? '#141c2d' : '#ffffff',
          },
        },
        shape: {
          borderRadius: 14,
        },
        typography: {
          fontFamily: '"Segoe UI", "Trebuchet MS", sans-serif',
          button: {
            textTransform: 'none',
            fontWeight: 700,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 999,
              },
            },
          },
          MuiDialog: {
            styleOverrides: {
              paper: {
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <LegacyThemeProvider theme={theme}>
        <Provider store={store}>
          <Cocktail mode={mode} onToggleTheme={handleToggleTheme} />
        </Provider>
      </LegacyThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
