<template>
  <li v-ripple @click="$emit('message-click',messageId)">
    <div class="message-list-header">
      <h5>{{ message.messageSender }}</h5>
      <message-priority :priority="message.messagePriority" size="s" />
    </div>
    <div class="message-date">
      {{ message?.messageAtDate?.format("YYYY-MM-DD HH:mm:ss") }}
    </div>
    <div class="message-subject">
      {{ message.messageSubject }}
    </div>
  </li>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { message } from '../libs/Jwt'
import MessagePriority from './MessagePriority.vue'

export default defineComponent({
  components: { MessagePriority },
  props: {
    message: {
      type: Object as PropType<message>,
      default: () => ({})
    },
    messageId: {
      type: String,
      default: ''
    }
  },
  emits: ['message-click'],
  setup () {
    //
  }
})
</script>
<style lang="scss" scoped>
.message-list-header{
  h5{
    margin: 0;
    padding: 0;
  }
  display: flex;
  justify-content: space-between;
}
li{
  list-style: none;
  padding:0.5em;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  &:hover{
    background-color: #dfdfdf;
  }
  transition: 0.3s all;
  &.selected{
    background-color: #ddd;
  }
}
.message-subject{
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.message-date{
  font-size:10px;
  text-align: right;
  margin-top: 0.3em;

}
</style>
