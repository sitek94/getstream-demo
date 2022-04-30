import * as React from 'react'
import { User } from 'db/users'

type State = {
  isAuthenticated: boolean
  user: null | User
  token: null | string
}

type Context = State & {
  login(user: User, token): void
  logout(): void
}

const AuthContext = React.createContext<Context | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState({
    isAuthenticated: false,
    user: null,
    token: null,
  })

  // // 🚨 It's `null` initially, because we don't know if the user is authenticated or not.
  // // While we're waiting for the API to respond, we show a spinner.
  // if (state.isAuthenticated === null) {
  //   return <h1>Loading...</h1>
  // }

  // There is no need to optimize this `value` with React.useMemo here, since it
  // is the top-most component in the app, so it will very rarely re-render, so
  // it's not going to cause a performance problem.
  const context: Context = {
    ...state,
    login: (user: User, token: string) =>
      setState({ isAuthenticated: true, user, token }),
    logout: () => setState({ isAuthenticated: false, user: null, token: null }),
  }

  return <AuthContext.Provider value={context} children={children} />
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export function useUser() {
  const { user, token } = useAuth()
  if (!user) {
    throw new Error('`userUser` should be used only in authenticated views!')
  }
  return {
    ...user,
    token,
  }
}
