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
      isNegative?: boolean
      districts: []
   }

   interface ScoredCircuit extends Circuit {
      distance_from_origin: string
      score: number
      route: Route
      isFavorite?: boolean
   }

   interface District {
      district_id: string
      geometry: {
         location: {
            lat: number
            lng: number
         }
         viewport: {}
      }
      name: string
      place_id: string
      distanceFromOrigin?: number
      tourism: string
   }

   interface TripStats {
      origin: string
      destination: string
      swingDifference: number
      score: number
      districts: District[]
   }

   interface ExtraScore {
      circuit_number: number
      city_name: string
      favorite_targets: string
   }
}
