import React, {useContext, useEffect, lazy} from 'react'

import './App.css'

const loadAuthenticatedApp = () => import('./components/authenticated-app')
const AuthenticatedApp = lazy(loadAuthenticatedApp)
const UnauthenticatedApp = lazy(() =>
  import('./components/unauthenticated-app')
)
//const Prueba = React.lazy(() => import('./components/prueba'))

function App() {
  var user = false
  useEffect(() => {
    loadAuthenticatedApp()
  }, [])
  return (
    <React.Suspense fallback={<div>cargando...</div>}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export default App
