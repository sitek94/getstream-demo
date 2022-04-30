import * as React from 'react'

import { AuthProvider, useAuth } from 'features/auth'

import AuthenticatedApp from './authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app'

export function App() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
