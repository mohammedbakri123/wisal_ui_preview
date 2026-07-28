import { setupWorker } from 'msw/browser'
import { authHandlers } from './handlers/auth'
import { conversationHandlers } from './handlers/conversations'
import { messageHandlers } from './handlers/messages'

export const worker = setupWorker(...authHandlers, ...conversationHandlers, ...messageHandlers)
