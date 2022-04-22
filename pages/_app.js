import '../src/styles/globals.scss'
import ContextProvider from '../src/contexts/Context';
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </SnackbarProvider>
  )
}

export default MyApp
