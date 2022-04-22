import '../src/styles/globals.scss'
import ContextProvider from '../src/contexts/Context';
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import Router from "next/router"
import NProgress from "nprogress"

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
    <SnackbarProvider maxSnack={3}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </SnackbarProvider>
  )
}

export default MyApp
