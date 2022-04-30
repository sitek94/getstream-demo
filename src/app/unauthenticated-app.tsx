import * as React from 'react'
import { User, users } from 'db/users'

import { useAuth } from 'features/auth'

import { API_URL } from '../config'
import styles from './unauthenticated-app.module.css'

export function UnauthenticatedApp() {
  const { login: loginOnTheClient } = useAuth()

  const onLogin = (user: User) => {
    fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
      }),
    })
      .then(res => res.json())
      .then(({ token }) => {
        loginOnTheClient(user, token)
      })
  }

  return (
    <div className={styles.page}>
      <header>
        <h1>Login</h1>
      </header>
      <section className={styles.buttons}>
        {users.map(user => (
          <button className={styles.button} onClick={() => onLogin(user)}>
            <img
              className={styles.avatar}
              src={user.avatar}
              alt={`${user.name}'s avatar`}
            />
            <span>{user.name}</span>
          </button>
        ))}
      </section>
    </div>
  )
}
