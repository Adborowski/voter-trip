export const getCircuitByNumber = (circuitList: Circuit[], circuitNumber: number) => {
   //
   console.log('Getting circuit from number', circuitNumber, circuitList)
   const filteredCircuits: any = circuitList?.filter((circuit) => {
      if (circuit.circuit_number === circuitNumber) {
         console.log('Match', circuit.circuit_number, circuitNumber)
         return true
      }
   })

   if (filteredCircuits.length) {
      return filteredCircuits[0]
   }
}
