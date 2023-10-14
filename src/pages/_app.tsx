import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
   // unlock this to show Prod to the world
   //  return <></>
   return <Component {...pageProps} />
}
