import { defineStore } from 'pinia'

export const useMyStore = defineStore('myStore', {
  state: () => ({
    count: 1,
  }),
  getters: {
    doubleCounter: state => state.count * 2,
  },
  actions: {
    add() {
      this.count++
    },
  },
  persist: {
    storage: persistedState.localStorage,
    paths: ['count'],
  },
})
