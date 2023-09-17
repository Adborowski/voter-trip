import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './index.module.scss'
import { ShareFacebook, ShareLinkedIn } from '@/components/social/social'

export default function Home() {
   const router = useRouter()

   const quotes = [
      {
         content: `Różnice siły głosu między 41 okręgami wyborczymi są dziś w Polsce dramatyczne.
         Oprócz tego, na jaką partię oddamy nasz głos, bardzo ważne jest to, gdzie
         zagłosujemy.`,

         author: `Michał Majewski, obywatele.news`,
         link: `https://obywatele.news/gdzie-nasz-glos-bedzie-mial-najwiekszy-wplyw-na-wynik-praktyczny-poradnik-wyborczy-czesc-2/`,
      },

      {
         content: `(...) powinniśmy unikać głosowania w największych ośrodkach miejskich, takich jak Warszawa oraz powiaty wokół stolicy, Gdańsk, Kraków, Poznań, Wrocław. W przypadku Warszawy wystarczy krótka, bo już kilkunastominutowa, podróż do Sulejówka, by głosować w okręgu siedleckim. Tam siła głosu jest większa (a przy tym preferencje wyborcze nieco inne).`,

         author: `Gazeta Wyborcza`,
         link: `https://wyborcza.biz/biznes/7,177151,30091596,rusza-akcja-warszawskawycieczka-dlaczego-wyjazd-na-glosowanie.html`,
      },
      {
         content: `W wyborach w 2019 roku do uzyskania jednego mandatu w Warszawie potrzeba było zdobyć prawie 70 tys. głosów - podczas gdy w Elblągu wystarczyło ich tylko 31,4 tys. Analogicznie, we wszystkich dużych dużych miastach w Polsce pojedynczy głos ma mniejszą wagę niż w okolicznych powiatach.`,

         author: `wazymyglosy.pl`,
         link: `https://www.wazymyglosy.pl/`,
      },
   ]

   return (
      <div className={styles.index}>
         <h1>Wycieczka Wyborcza</h1>
         <ShareFacebook />
         <ShareLinkedIn />
         <section className={styles.quotesWrapper}>
            {quotes.map((quote) => {
               return (
                  <article key={quote.author} className={styles.quote}>
                     <div className={styles.content}>{quote.content}</div>
                     <Link className={styles.attribution} target={'_blank'} href={quote.link}>
                        {quote.author}
                     </Link>
                     {/* <div className={styles.attribution}>{quote.author}</div> */}
                  </article>
               )
            })}
         </section>
         <button
            onClick={() => {
               router.push('/map')
            }}
         >
            Zaplanuj wycieczkę
         </button>
      </div>
   )
}
