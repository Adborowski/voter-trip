import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './index.module.scss'
import SocialPanel from '@/components/social/social-panel'
import Quotes from '@/components/landing/quotes'
import Guide from '@/components/landing/guide'
import { hotjar } from 'react-hotjar'
import { useEffect } from 'react'

export default function Home() {
   useEffect(() => {
      hotjar.initialize(3688864, 6)
   }, [])

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
         <section className={styles.textWrapper}>
            <h1>Wycieczka Wyborcza</h1>
            <h2>
               <span>Twój głos może mieć większą moc!</span>
               <span>Wyjedź na wycieczkę wyborczą i pomóż wygrać opozycji.</span>
            </h2>
            <div className={styles.description}>
               <span>
                  Analizujemy dostępne dane sondażowe, żeby zmaksymalizować wynik wyborczy opozycji
                  demokratycznej. W wielu okręgach wystarczy tylko kilka tysięcy głosów, aby
                  opozycja uzyskała dodatkowy mandat.
               </span>
            </div>
         </section>
         <SocialPanel />

         <div className={styles.polandWrapper}>
            <div className={styles.imgPoland} />
            <button
               className={styles.btnPlanTrip}
               onClick={() => {
                  router.push('/map')
               }}
            >
               Zaplanuj wycieczkę
            </button>
         </div>

         <Guide />
      </div>
   )
}
