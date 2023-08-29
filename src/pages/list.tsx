import CircuitCard from '@/components/circuit/circuit-card'
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

   return (
      <>
         <HomeButton />
         {circuits &&
            circuits.map((circuit) => (
               <CircuitCard key={circuit.circuit_number + circuit.city_name} circuit={circuit} />
            ))}
      </>
   )
}

export default ListaOkregow
