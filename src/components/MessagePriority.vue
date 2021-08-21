<template>
  <ui-badge :state="priorityState" :class="{small: size=='s'}">
    <template #badge>
      {{ priorityText }}
    </template>
  </ui-badge>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { MessagePriority } from '../libs/Jwt'

export default defineComponent({
  props: {
    priority: {
      type: Number as PropType<0|1|2|3>,
      default: 0,
      required: true
    },
    size: {
      type: String as PropType<'l'|'s'>,
      default: 'l'
    }
  },
  setup () {
    //
  },
  data: () => ({

  }),
  computed: {
    priorityText () {
      return MessagePriority[this.priority]
    },
    priorityState () {
      return ['error', 'warning', 'success', 'info'][this.priority]
    }
  }
})
</script>
<style lang="scss" scoped>
.small{
  &:deep(sup){
    font-size: 10px;
  }
}
</style>
