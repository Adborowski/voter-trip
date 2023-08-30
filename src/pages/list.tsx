import CircuitList from '@/components/circuit/circuit-list'
import HomeButton from '@/components/navbar/home-button'
import { useEffect, useState } from 'react'

const ListaOkregow = (props: any) => {
   const [circuits, setCircuits] = useState<Circuit[]>()
   useEffect(() => {
      fetch('/api/get-circuits')
         .then((res) => res.json())
         .then((circuits) => {
            if (circuits) {
               console.log(circuits)
               setCircuits(circuits)
            }
         })
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   if (circuits) {
      return (
         <>
            <HomeButton />
            <CircuitList circuits={circuits} length={41} />
         </>
      )
   }
}

export default ListaOkregow
