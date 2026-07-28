import type { Message } from '@/core/types'

type MessageHandler = (message: Message) => void

interface RealtimeConnection {
  subscribe: (conversationId: string, handler: MessageHandler) => () => void
  publish: (message: Message) => void
}

class MockRealtimeConnection implements RealtimeConnection {
  private handlers = new Map<string, Set<MessageHandler>>()

  subscribe(conversationId: string, handler: MessageHandler) {
    const handlers = this.handlers.get(conversationId) ?? new Set<MessageHandler>()
    handlers.add(handler)
    this.handlers.set(conversationId, handlers)

    return () => {
      handlers.delete(handler)
      if (handlers.size === 0) this.handlers.delete(conversationId)
    }
  }

  publish(message: Message) {
    this.handlers.get(message.conversationId)?.forEach((handler) => handler(message))
  }
}

class BrowserWebSocketConnection implements RealtimeConnection {
  private socket: WebSocket | null = null
  private handlers = new Map<string, Set<MessageHandler>>()
  private readonly url: string

  constructor(url: string) {
    this.url = url
    this.connect()
  }

  subscribe(conversationId: string, handler: MessageHandler) {
    const handlers = this.handlers.get(conversationId) ?? new Set<MessageHandler>()
    handlers.add(handler)
    this.handlers.set(conversationId, handlers)

    return () => {
      handlers.delete(handler)
      if (handlers.size === 0) this.handlers.delete(conversationId)
    }
  }

  publish(message: Message) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'message', payload: message }))
      return
    }

    this.dispatch(message)
  }

  private connect() {
    this.socket = new WebSocket(this.url)
    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data) as { type?: string; payload?: Message }
      if (data.type === 'message' && data.payload) {
        this.dispatch(data.payload)
      }
    })
    this.socket.addEventListener('close', () => {
      window.setTimeout(() => this.connect(), 1500)
    })
  }

  private dispatch(message: Message) {
    this.handlers.get(message.conversationId)?.forEach((handler) => handler(message))
  }
}

const wsUrl = import.meta.env.VITE_WS_URL as string | undefined

export const realtimeConnection: RealtimeConnection = wsUrl
  ? new BrowserWebSocketConnection(wsUrl)
  : new MockRealtimeConnection()
