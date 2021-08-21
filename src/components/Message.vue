<template>
  <ui-card v-if="selectedMessage" class="message-card">
    <header class="message-card-header">
      <div>
        <h2><span class="pre-text">From: </span>{{ selectedMessage.messageSender }}<message-priority :priority="selectedMessage.messagePriority" size="l" class="message-title-priority" /></h2>
        <span class="pre-text">
          {{ selectedMessage.messageAtDate?.format("YYYY-MM-DD HH:mm:ss") }}
        </span>
      </div>
      <div>
        <p><span class="pre-text">Subject: </span>{{ selectedMessage.messageSubject }}</p>
      </div>
      <div>
        <p class="pre-text">
          inbox alias: {{ messageMeta.alias }}<br>
          inbox id: {{ messageMeta.inboxId }}
        </p>
      </div>
    </header>
    <div>
      <p>
        {{ selectedMessage.messageContent }}
      </p>
    </div>
  </ui-card>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '../vuex/index'
import { message } from '../libs/Jwt'
import MessagePriority from './MessagePriority.vue'

export default defineComponent({
  components: { MessagePriority },
  setup () {
    const store = useStore()
    return {
      selectedMessage: computed(():message => store.getters.selectedMessage),
      messageMeta: computed(() => store.getters.messageMeta)
    }
  }
})
</script>
<style lang="scss" scoped>
.message-card{
  padding:1em;
  max-width: 80%;
  margin: 3em auto 0;
  text-align: left;
  h2{
    font-size: 18px;
    padding: 0;
    margin: 0;
  }
}

.message-card-header{
  &>div{
    display: flex;
    justify-content: space-between;
  }
}
.pre-text{
  font-size: 12px;
  padding-right: 0.3em;
  font-weight: normal;
}
.message-title-priority{
  padding-left: 0.3em;
}
</style>
