import styles from './circuits.module.css'

interface SwingInfoProps {
   circuit: any
}

const SwingInfo = (props: SwingInfoProps) => {
   const circuit = props.circuit
   const { swing_factor, winner_2019 } = circuit.circuit

   let supportScale = 'Nieznana' // "mocna" , "umiarkowana" itd.
   let supportClass = ''
   if (swing_factor < 1.3) {
      supportScale = 'Lekka'
      supportClass = styles.supportLight
   }

   if (swing_factor >= 1.3 && swing_factor < 2) {
      supportScale = 'Mocna'
      supportClass = styles.supportStrong
   }

   if (swing_factor >= 2) {
      supportScale = 'Bardzo mocna'
      supportClass = styles.supportVeryStrong
   }

   let winnerDisplayName = winner_2019 === 'party_ko' ? 'KO' : 'PIS'

   return (
      <section className={`${styles.swingInfo} ${supportClass}`}>
         <span>
            {supportScale} przewaga {winnerDisplayName}
         </span>
      </section>
   )
}

export default SwingInfo
