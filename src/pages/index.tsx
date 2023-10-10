import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './index.module.scss'
import SocialPanel from '@/components/social/social-panel'
import Guide from '@/components/landing/guide'
import Script from 'next/script'

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
         <Script>
            {`(function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:3688864,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
               })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
         </Script>
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
