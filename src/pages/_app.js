import '../styles/globals.scss'
import ContextProvider from '../contexts/Context';
import { OpenCartButton } from '../components/commons/Cart/OpenCartButton';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />    
      <OpenCartButton />
    </ContextProvider>
  )
}

export default MyApp
