import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
   return (
      <Html lang="en">
         <Head>
            <title>Wycieczka Wyborcza 2023</title>

            <meta
               name="description"
               content="15 października twój głos może być silniejszy gdzieś indziej"
            />
         </Head>
         <body>
            <Main />
            <NextScript />
         </body>
      </Html>
   )
}
