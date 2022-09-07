import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { ProviderAuth } from '../lib/auth';
import '../styles/globals.css';
import theme from '../styles/theme';
import { Global, css } from '@emotion/react';
import Head from 'next/head';

const GlobalStyle = ({ children }) => {
   return (
      <>
         <Head>
            <meta
               content="width=device-width, initial-scale=1"
               name="viewport"
            />
         </Head>
         <CSSReset />
         <Global
            styles={css`
               html {
                  scroll-behavior: smooth;
               }
               #__next {
                  display: flex;
                  flex-direction: column;
                  min-height: 100vh;
               }
            `}
         />
         {children}
      </>
   );
};

function MyApp({ Component, pageProps }) {
   return (
      <ChakraProvider theme={theme}>
         <ProviderAuth>
            <GlobalStyle />
            <Component {...pageProps} />
         </ProviderAuth>
      </ChakraProvider>
   );
}

export default MyApp;
