import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
   // unlock this to show Prod to the world
   //  return <></>
   return (
      <>
         <Head>
            <title>Wycieczka Wyborcza 2023</title>
         </Head>
         <Component {...pageProps} />
      </>
   )
}
