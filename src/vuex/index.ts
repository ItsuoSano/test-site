import { createStore, Store, useStore as baseUserStore } from 'vuex'
import { messageData, message } from '../libs/Jwt'
import { InjectionKey } from 'vue'

declare module '@vue/runtime-core' {
  interface State {
    messageData: messageData
    key: string
  }

  interface ComponentCustomProperties{
    $state: Store<State>
  }
}

export interface State{
  messageData: messageData | null;
  key: string
}

// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state () {
    return {
      messageData: null as null | messageData,
      key: ''
    }
  },
  mutations: {
    setMessageData (state, value: messageData) {
      console.log(value)
      state.messageData = value
    },
    setKey (state, value: string) {
      state.key = value
    }
  },
  getters: {
    messages (state):messageData['messages'] | undefined {
      return state.messageData?.messages
    },
    selectedMessage (state):message |undefined {
      return state.messageData?.messages[state.key] ?? undefined
    },
    messageMeta (state) {
      return { alias: state.messageData?.inboxAlias, inboxId: state.messageData?.inboxId }
    }
  }
})

export const useStore = ():Store<State> => baseUserStore(key)
