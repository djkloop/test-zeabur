<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next'
import { useMyStore } from '~/store/myStore'

const store = useMyStore()
const router = useRouter()

function handleToUserAdmin10() {
  router.push({
    path: '/user-test/10',
  })
}

function handleToAbout() {
  router.push({
    path: '/about',
    query: {
      id: 20,
      username: '李四',
    },
  })
}

function handleShowMessage() {
  MessagePlugin.info('用户表示普通操作信息提示')
}

// state
const counter = useCounter()

function hnaldeCounterAdd() {
  counter.value++
}

const userInfoCookie = useCookie('userInfo', { maxAge: 60 })
userInfoCookie.value = JSON.stringify({
  uid: 123,
  username: '张三',
})

const userInfo = useCookie('userInfo')

// fetch
// function handleGetUserUID() {
//   const {  }
// }
const { data, pending } = useFetch('/api/user')
</script>

<template>
  <div h-100vh p-4>
    <h1>Nuxt Routing set up successfully!</h1>
    <h2>Myplugin -> {{ $myPlugin("Cool!") }}</h2>
    <h2>pinia store -> {{ store.count }}</h2>
    <h2>pinia store -> {{ store.doubleCounter }}</h2>
    <TSpace direction="vertical">
      <TButton @click="() => store.add()">
        add pinia store
      </TButton>
      <TSpace>
        <TButton theme="danger" @click="$message.error('用户表示普通操作信息提示')">
          Message2
        </TButton>
        <TButton @click="handleShowMessage">
          Message
        </TButton>
      </TSpace>
      <TSpace>
        <NuxtLink to="/about">
          <SetupButton>
            Go To About!!
          </SetupButton>
        </NuxtLink>
        <NuxtLink to="/user-admin/8">
          <SetupButton>
            Go To User Admin 8!!
          </SetupButton>
        </NuxtLink>
        <SetupButton @click="handleToUserAdmin10">
          Go To User Test 10!!
        </SetupButton>
        <SetupButton @click="handleToAbout">
          Go To About Query
        </SetupButton>
      </TSpace>
    </TSpace>
    <TCard title="State">
      <TSpace direction="vertical" my-4>
        <TButton @click="hnaldeCounterAdd">
          counter -> {{ counter }}
        </TButton>
        <p>
          cookie -> {{ userInfo }}
        </p>
        <p id="idEle">
          fetchData -> {{ pending ? '加载中...' : data?.uid }}
        </p>
      </TSpace>
    </TCard>
  </div>
</template>
