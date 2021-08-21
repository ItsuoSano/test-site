<template>
  <div class="card-container">
    <ui-card class="digit-input-card">
      <div v-if="isLoading" class="overlay">
        <ui-spinner active />
      </div>
      <ui-alert v-if="showAlert" state="error">
        エラーが発生しました。
      </ui-alert>
      <ui-card-content>
        <ui-textfield v-model="inputValue"
                      class="digit-input"
                      outlined
                      maxlength="6"
        >
          Input Digit
        </ui-textfield>
      </ui-card-content>
      <ui-card-actions>
        <ui-button class="send-button"
                   outlined
                   :disabled="buttonDisabled"
                   @click="send"
        >
          Send
        </ui-button>
      </ui-card-actions>
    </ui-card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { axiosInstance } from '../libs/Http'
import { messageData, parseJwt } from '../libs/Jwt'
import { useStore } from '../vuex/index'

export default defineComponent({
  setup () {
    //
    const store = useStore()
    return {
      setMessageData: (value:messageData) => {
        store.commit('setMessageData', value)
      }
    }
  },
  data: () => ({
    inputValue: '',
    isLoading: false,
    showAlert: false
  }),
  computed: {
    buttonDisabled () {
      return this.inputValue.length < 6
    }
  },
  methods: {
    async send () {
      this.showAlert = false
      this.isLoading = true
      try {
        const result = await axiosInstance.get(`inbox/${this.inputValue}`).then(res => {
          const payload = res.data?.payload
          if (payload) {
            return parseJwt(payload)
          } else {
            throw new Error('decode Error')
          }
        })
        this.setMessageData(result)

        this.$router.push('/messages')
      } catch (e) {
        this.showAlert = true
      } finally {
        this.isLoading = false
      }
    }
  }
})
</script>
<style scoped>
.card-container{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5em;
}

.digit-input-card{
  padding: 2em;
  min-width: 400px;
}
.digit-input{
  margin-top: 1em;
}
.send-button.send-button{
  display: block;
  width: 100%;
  margin-top: 3em;
}
.overlay{
  position: absolute;
  background-color: rgba(255,255,255,0.5);
  top:0;
  bottom: 0;
  left:0;
  right:0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
