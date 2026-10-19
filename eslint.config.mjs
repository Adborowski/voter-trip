import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

export default [
   ...nextCoreWebVitals,
   { ignores: ['.next/**', 'list_scripts/**', 'next-env.d.ts'] },
]
