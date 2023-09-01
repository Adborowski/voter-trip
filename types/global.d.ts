export {}

declare global {
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
      winner_2019: string
      city_id: string
      distance_from_origin?: string
      score?: number
      route?: Route
      isDestination?: boolean
      isTripOrigin?: boolean
   }

   interface ScoredCircuit extends Circuit {
      distance_from_origin: string
      score: number
      route: Route
   }
}
