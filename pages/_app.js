import '../src/styles/globals.scss'
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import Router from "next/router"
import NProgress from "nprogress"
import { Container, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 48,
    }
  },
});

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    const start = () => NProgress.start();
    const end = () => NProgress.done();

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);      
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    }
  }, []);

  return (    
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
          <Container sx={{ py: 4, height: '100%' }} maxWidth="md">
            <Component {...pageProps} />
          </Container>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default MyApp
