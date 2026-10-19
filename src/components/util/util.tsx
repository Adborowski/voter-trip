export const getCircuitByNumber = (circuitList: Circuit[], circuitNumber: number) => {
   const filteredCircuits: any = circuitList?.filter((circuit) => {
      if (circuit.circuit_number === circuitNumber) {
         return true
      }
   })

   if (filteredCircuits.length) {
      return filteredCircuits[0]
   }
}
