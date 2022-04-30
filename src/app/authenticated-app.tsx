import 'stream-chat-react/dist/css/index.css'

import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react'

import { useUser } from 'features/auth'

import { STREAM_CHAT_KEY } from '../config'

const sort = { last_message_at: -1 } as const

const App = () => {
  const user = useUser()
  const [chatClient, setChatClient] = useState<StreamChat | null>(null)

  const filters = { type: 'messaging', members: { $in: [user.id] } }

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance(STREAM_CHAT_KEY)

      await client.connectUser(
        {
          id: user.id,
          name: user.name,
          image: user.avatar,
        },
        user.token,
      )

      setChatClient(client)
    }

    initChat()
  }, [user])

  if (!chatClient) {
    return <LoadingIndicator />
  }

  return (
    <Chat client={chatClient} theme="messaging light">
      <ChannelList filters={filters} sort={sort} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  )
}

export default App
