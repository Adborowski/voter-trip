import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
   return (
      <Html lang="en">
         <Head>
            <title>Wycieczka Wyborcza 2023</title>
            <meta property="og:url" content={'aaaa'} key="ogurl" />
            <meta property="og:image" content={'bbbb'} key="ogimage" />
            <meta property="og:site_name" content="Calvin Torra" key="ogsitename" />
            <meta property="og:title" content={'cccc'} key="ogtitle" />
            <meta property="og:description" content={'dddd'} key="ogdesc" />
         </Head>
         <body>
            <Main />
            <NextScript />
         </body>
      </Html>
   )
}
