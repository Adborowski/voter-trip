import styles from './landing.module.scss'
import Link from 'next/link'
const Guide = () => {
   return (
      <article className={styles.guide}>
         <h1>Jak głosować poza miejscem zameldowania?</h1>
         <section>
            <h2>1. Zmiana miejsca głosowania (przez internet) </h2>
            <ul>
               <li>
                  Wejdź na stronę{' '}
                  <Link
                     target={'_blank'}
                     href={'https://www.gov.pl/web/gov/zmien-miejsce-glosowania'}
                  >
                     gov.pl
                  </Link>{' '}
                  i kliknij złóż wniosek. Masz czas do 12 października.
               </li>
               <li>Zaloguj się profilem zaufanym</li>
               <li>Podaj nazwę miejscowości, w której chcesz głosować i dokładny adres</li>
               <li>Potwierdzenie zmiany miejsca głosowania otrzymasz na skrzynce ePUAP</li>
               <li>W dniu wyborów udaj się z dowodem osobistym do komisji wyborczej</li>
            </ul>
         </section>
         <section>
            <h2>2. Pobranie zaświadczenia o prawie do głosowania (w urzędzie)</h2>
            <ul>
               <li>Udaj się do dowolnego urzędu gminy. Masz czas do 12 października</li>
               <li>Wypełnij i złóż wniosek o wydanie zaświadczenia o prawie do głosowania</li>
               <li>
                  Odbierz zaświadczenie z tego samego urzędu, aby móc głosować tam, gdzie będziesz
                  przebywać w dniu wyborów. UWAŻAJ! Nie możesz go zgubić
               </li>
               <li>
                  W dniu wyborów udaj się do dowolnej komisji wyborczej. Zabierz ze sobą dówód i
                  koniecznie odebrane zaświadczenie
               </li>
               <li>
                  <Link
                     target={'_blank'}
                     href={
                        'https://www.gov.pl/web/gov/uzyskaj-zaswiadczenie-i-glosuj-tam-gdzie-bedziesz-w-dniu-wyborow'
                     }
                  >
                     Więcej informacji
                  </Link>
               </li>
            </ul>
         </section>
      </article>
   )
}

export default Guide
