import '../src/styles/globals.scss'
import ContextProvider from '../src/contexts/Context';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default MyApp
