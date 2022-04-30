import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import { StreamChat } from 'stream-chat'

import { STREAM_CHAT_KEY } from '../src/config'

const app = express()
const port = 5555

const client = StreamChat.getInstance(
  STREAM_CHAT_KEY,
  process.env.STREAM_CHAT_SECRET as string,
)

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const channel = client.channel('messaging', 'TestChannel', {
  created_by_id: 'id-maciek',
})
channel.create()

app.post('/login', async (req, res) => {
  const { userId } = req.body

  // Create token for user who has just logged in
  const token = client.createToken(userId)

  // Upsert user into Stream user storage
  await client.upsertUser({
    id: userId,
  })

  // Add them to the channel
  await channel.addMembers([userId])

  res.send({ token })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
