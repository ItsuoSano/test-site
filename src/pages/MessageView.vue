<template>
  <div>
    <ui-drawer viewport-height>
      <ui-drawer-header v-if="messageMeta">
        <ui-drawer-title>{{ messageMeta.alias }}</ui-drawer-title>
        <ui-drawer-subtitle class="message-inbox-id">
          {{ messageMeta.inboxId }}
        </ui-drawer-subtitle>
      </ui-drawer-header>
      <ui-drawer-content>
        <ul class="message-list">
          <message-list-item v-for="(message,key) in messages"
                             :key="key"
                             :message-id="key"
                             :message="message"
                             :class="{selected:selectionId==key}"
                             @message-click="selectionId=$event"
          />
        </ul>
      </ui-drawer-content>
    </ui-drawer>
    <ui-drawer-app-content class="message-content">
      <message />
    </ui-drawer-app-content>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import Message from '../components/Message.vue'
import MessageListItem from '../components/MessageListItem.vue'
import { messageData } from '../libs/Jwt'
import { useStore } from '../vuex/index'

export default defineComponent({
  components: { MessageListItem, Message },
  setup () {
    const store = useStore()

    return {
      messageMeta: computed(() => store.getters.messageMeta),
      messages: computed(():messageData['messages'] => store.getters.messages),
      setKey: (value:string) => store.commit('setKey', value)
    }
  },
  data: () => ({
    selectionId: null
  }),
  watch: {
    selectionId (value) {
      this.setKey(value)
    }
  },
  mounted () {
    if (!this.messages) {
      this.$router.push('/')
    }
  }
})
</script>
<style lang="scss">
.message-inbox-id{
  word-break: break-all;
  font-size: 10px !important;
}
.message-list{
  padding: 0;
  margin: 0 ;
}
.message-content{
  width: 100%;
}

header{
  border-bottom: 1px dotted #333;
}

</style>
