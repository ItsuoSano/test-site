import moment, { Moment } from 'moment'
import jwtDecode from 'jwt-decode'
moment.locale('ja')

export const MessagePriority = {
  0: '重要',
  1: '高',
  2: '中',
  3: '低'
} as const

export interface message {
  messageSender: string;
  messageSenderId: string;
  messagePriority: keyof typeof MessagePriority;
  messageSubject: string;
  messageContent: string;
  messageAt: string; // date
  messageAtDate?: Moment
}

export interface messageData {
  inboxId: string;
  inboxAlias: string;
  fetchedAt: string; // date
  messages: Record<string, message>;
  messageMap:Map<string, message>
}

export const parseJwt = (jwtString: string): messageData => {
  const decodeObj = jwtDecode(jwtString) as messageData
  const messageMap = new Map()
  if (decodeObj.messages) {
    for (const key in decodeObj.messages) {
      const message = decodeObj.messages[key]
      message.messageAtDate = moment(message.messageAt)

      messageMap.set(key, message)
    }

    decodeObj.messageMap = messageMap
  }
  return decodeObj
}
