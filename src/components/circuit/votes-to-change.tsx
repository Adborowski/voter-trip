import styles from './circuits.module.css'

const VotesToChange = (props: any) => {
   const { votesToGain, votesToLose, gainingFrom, losingTo } = props

   let infoString = ''
   let gainComment = ''
   let lossComment = ''
   let infoClass = ''

   const partyNames: any = {
      party_pis: 'PIS',
      party_lewica: 'Lewica',
      party_trzeciadroga: 'Trzecia Droga',
      party_po: 'Platforma Obywatelska',
      party_konfederacja: 'Konfederacja',
   }

   return (
      <div className={styles.votesToChange}>
         <div className={styles.voteInfoBlock}>
            Do kolejnego mandatu brakuje {votesToGain} głosów. Opozycja odebrałaby go od:{' '}
            {partyNames[gainingFrom]}
         </div>
         <div className={styles.voteInfoBlock}>
            Do straty mandatu brakuje {votesToLose} głosów. Opozycja straciłaby go na rzecz:{' '}
            {partyNames[losingTo]}
         </div>
      </div>
   )
}

export default VotesToChange
