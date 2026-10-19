import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { IBM_Plex_Sans } from 'next/font/google'

const plexSans = IBM_Plex_Sans({
   subsets: ['latin', 'latin-ext'],
   weight: ['400', '500', '600', '700'],
   display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
   // unlock this to show Prod to the world
   //  return <></>
   return (
      <>
         <Head>
            <title>Wycieczka Wyborcza 2023</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
         </Head>
         <style jsx global>{`
            :root {
               --font-sans: ${plexSans.style.fontFamily};
            }
         `}</style>
         <Component {...pageProps} />
      </>
   )
}
