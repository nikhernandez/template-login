import React from 'react'
import './App.css'

const loadAuthenticatedApp = () => import('./components/authenticated-app')
const AuthenticatedApp = React.lazy(loadAuthenticatedApp)
const UnauthenticatedApp = React.lazy(() =>
  import('./components/unauthenticated-app')
)
//const Prueba = React.lazy(() => import('./components/prueba'))

function App() {
  var user = false
  React.useEffect(() => {
    loadAuthenticatedApp()
  }, [])
  return (
    <React.Suspense fallback={<div>cargando...</div>}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export default App
