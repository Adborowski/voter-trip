import CircuitList from '@/components/circuit-list'
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
   }, [])

   return <CircuitList circuitList={circuits} />
}

export default ListaOkregow
