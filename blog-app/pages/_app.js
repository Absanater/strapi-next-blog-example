import { SWRConfig } from 'swr';
import { fetcher } from '../utils/api';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp
