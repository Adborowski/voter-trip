import CircuitCard from '@/components/list/circuit-card'
import CircuitList from '@/components/list/circuit-list'
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

   return <>{circuits && circuits.map((circuit) => <CircuitCard circuit={circuit} />)}</>
}

export default ListaOkregow
