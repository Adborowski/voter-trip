import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
   return (
      <Html lang="en">
         <Head>
            <title>Wycieczka Wyborcza 2023</title>
         </Head>

         <body>
            <Main />
            <NextScript />
         </body>
      </Html>
   )
}
