<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next'

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
</script>

<template>
  <div h-100vh>
    <h1>Nuxt Routing set up successfully!</h1>
    <h2>Myplugin -> {{ $myPlugin("Cool!") }}</h2>
    <TSpace>
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
  </div>
</template>
