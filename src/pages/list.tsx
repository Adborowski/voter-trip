import CircuitList from '@/components/circuit-list'
import { useEffect, useState } from 'react'

interface Circuit {
   circuit_number: number
   city_name: string
   mandates: number
   latitude: number
   longitude: number
   residents: number
   residentsPerMandate: number
   swing_factor: number
   votes_ko_2019: number
   votes_pis_2019: number
}

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
