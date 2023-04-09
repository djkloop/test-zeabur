import { MessagePlugin } from 'tdesign-vue-next'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      message: MessagePlugin,
    },
  }
})
