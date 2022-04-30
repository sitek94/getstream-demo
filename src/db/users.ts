import { API_URL } from '../config'

export type User = {
  id: string
  name: string
  avatar: string
}

export const users: User[] = [
  {
    id: 'id-maciek',
    name: 'Maciek',
    avatar: `${API_URL}/maciek.png`,
  },
  {
    id: 'id-beethoven',
    name: 'Beethoven',
    avatar: `${API_URL}/beethoven.png`,
  },
  {
    id: 'id-mozart',
    name: 'Mozart',
    avatar: `${API_URL}/mozart.png`,
  },
  {
    id: 'id-chopin',
    name: 'Chopin',
    avatar: `${API_URL}/chopin.png`,
  },
]
