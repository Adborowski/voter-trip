import { useEffect, useRef } from 'react'
import styles from './trip-map.module.scss'

// Decorative hero map: inlines /powiaty.svg and keeps lighting up random
// pairs of nearby powiaty (origin -> destination) as dummy "trips".

const SVG_NS = 'http://www.w3.org/2000/svg'
const TRIP_EVERY_MS = 1600
const TRIP_LIFETIME_MS = 4800
const MIN_DISTANCE = 70 // in SVG units (viewBox is 1500 wide)
const MAX_DISTANCE = 220

interface Powiat {
   path: SVGPathElement
   x: number
   y: number
}

const TripMap = ({ className }: { className?: string }) => {
   const containerRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      let cancelled = false
      let interval: number | undefined
      const timeouts: number[] = []

      fetch('/powiaty.svg')
         .then((res) => res.text())
         .then((markup) => {
            const container = containerRef.current
            if (cancelled || !container) return

            const doc = new DOMParser().parseFromString(markup, 'image/svg+xml')
            const svg = doc.documentElement as unknown as SVGSVGElement
            svg.removeAttribute('width')
            svg.removeAttribute('height')
            svg.setAttribute('aria-hidden', 'true')
            container.replaceChildren(svg)

            const powiaty: Powiat[] = Array.from(svg.querySelectorAll('path')).map((path) => {
               const box = path.getBBox()
               return { path, x: box.x + box.width / 2, y: box.y + box.height / 2 }
            })

            // routes are drawn above the powiaty
            const routeLayer = document.createElementNS(SVG_NS, 'g')
            svg.appendChild(routeLayer)

            const busy = new Set<SVGPathElement>()

            const startTrip = () => {
               const free = powiaty.filter((p) => !busy.has(p.path))
               const origin = free[Math.floor(Math.random() * free.length)]
               if (!origin) return
               const candidates = free.filter((p) => {
                  const d = Math.hypot(p.x - origin.x, p.y - origin.y)
                  return d >= MIN_DISTANCE && d <= MAX_DISTANCE
               })
               const destination = candidates[Math.floor(Math.random() * candidates.length)]
               if (!destination) return

               busy.add(origin.path)
               busy.add(destination.path)
               origin.path.classList.add(styles.origin)
               destination.path.classList.add(styles.destination)

               const route = document.createElementNS(SVG_NS, 'line')
               route.setAttribute('x1', String(origin.x))
               route.setAttribute('y1', String(origin.y))
               route.setAttribute('x2', String(destination.x))
               route.setAttribute('y2', String(destination.y))
               route.setAttribute('pathLength', '1')
               route.classList.add(styles.route)
               routeLayer.appendChild(route)

               timeouts.push(
                  window.setTimeout(() => {
                     origin.path.classList.remove(styles.origin)
                     destination.path.classList.remove(styles.destination)
                     route.classList.add(styles.routeOut)
                     timeouts.push(
                        window.setTimeout(() => {
                           route.remove()
                           busy.delete(origin.path)
                           busy.delete(destination.path)
                        }, 700)
                     )
                  }, TRIP_LIFETIME_MS)
               )
            }

            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            if (reducedMotion) {
               // a few static trips instead of a loop
               for (let i = 0; i < 4; i++) startTrip()
               timeouts.forEach((t) => window.clearTimeout(t))
               return
            }

            startTrip()
            interval = window.setInterval(startTrip, TRIP_EVERY_MS)
         })
         .catch(() => {
            // purely decorative; leave the space empty if the SVG fails to load
         })

      return () => {
         cancelled = true
         window.clearInterval(interval)
         timeouts.forEach((t) => window.clearTimeout(t))
      }
   }, [])

   return <div ref={containerRef} className={`${styles.tripMap} ${className ?? ''}`} />
}

export default TripMap
