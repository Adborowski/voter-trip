import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './index.module.scss'
import SocialPanel from '@/components/social/social-panel'
import Guide from '@/components/landing/guide'
import TripMap from '@/components/landing/trip-map'

const sources = [
   {
      title: 'Okręgi wyborcze do Sejmu Rzeczypospolitej Polskiej',
      publisher: 'Wikipedia',
      href: 'https://pl.wikipedia.org/wiki/Okr%C4%99gi_wyborcze_do_Sejmu_Rzeczypospolitej_Polskiej',
   },
   {
      title: 'Wybory do Sejmu 2023. PKW apeluje o zmianę rozkładu mandatów',
      publisher: 'Demagog, 17.01.2023',
      href: 'https://demagog.org.pl/wypowiedzi/wybory-do-sejmu-2023-pkw-apeluje-o-zmiane-rozkladu-mandatow/',
   },
   {
      title: 'Sejm, ordynacja, demografia i frekwencje',
      publisher: 'OKO.press, 21.10.2023',
      href: 'https://oko.press/sejm-ordynacja-demografia-i-frekwencje',
   },
   {
      title: "Metoda D'Hondta",
      publisher: 'Wikipedia',
      href: 'https://pl.wikipedia.org/wiki/Metoda_D%E2%80%99Hondta',
   },
]

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
         <section className={styles.hero}>
            <div className={styles.heroText}>
               <span className="eyebrow">Wybory parlamentarne · 15.10.2023</span>
               <h1>Wycieczka Wyborcza</h1>
               <p className={styles.lead}>
                  Twój głos może mieć większą moc. Wyjedź na wycieczkę wyborczą i pomóż wygrać
                  opozycji.
               </p>
               <p className={styles.description}>
                  Analizujemy dostępne dane sondażowe, żeby zmaksymalizować wynik wyborczy opozycji
                  demokratycznej. W wielu okręgach wystarczy tylko kilka tysięcy głosów, aby
                  opozycja uzyskała dodatkowy mandat.
               </p>
               <div className={styles.actions}>
                  <button
                     className="btn btn-primary"
                     onClick={() => {
                        router.push('/map')
                     }}
                  >
                     Zaplanuj wycieczkę <span aria-hidden>→</span>
                  </button>
                  <SocialPanel />
               </div>
            </div>
            <TripMap className={styles.heroMap} />
         </section>

         <section className={styles.why}>
            <h2>Dlaczego to ma sens?</h2>
            <div>
               <p>
                  Posłów wybieramy w 41 okręgach<sup>1</sup>, a liczba mandatów w każdym z nich nie
                  nadąża za zmianami liczby mieszkańców. Sejm nie zajął się wnioskiem PKW z 2022 roku
                  o jej korektę<sup>2</sup>. Dlatego w dużych miastach na jeden mandat przypada
                  znacznie więcej wyborców niż w mniejszych okręgach: w wyborach w 2023 roku w
                  Warszawie było to 85,7 tys. głosów na mandat, w Elblągu tylko 37,4 tys.
                  <sup>3</sup> Do tego metoda D&apos;Hondta<sup>4</sup> sprawia, że w wielu
                  okręgach o kolejnym mandacie decyduje zaledwie kilka tysięcy głosów. Prawo pozwala
                  zagłosować poza miejscem zameldowania, więc krótka podróż do sąsiedniego okręgu
                  może sprawić, że Twój głos będzie ważył więcej. Ta strona wskazuje, dokąd warto
                  pojechać.
               </p>
               <ol className={styles.sources}>
                  {sources.map((source) => (
                     <li key={source.href}>
                        <a href={source.href} target="_blank" rel="noopener noreferrer">
                           {source.title}
                        </a>{' '}
                        <span>{source.publisher}</span>
                     </li>
                  ))}
               </ol>
            </div>
         </section>

         <Guide />
      </div>
   )
}
