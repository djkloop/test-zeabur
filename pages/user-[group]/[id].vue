<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <NuxtLink to="/">
      <TButton theme="danger">
        Go Home
      </TButton>
    </NuxtLink>
    <br>
    我的用户组是 -> {{ route.params.group }}<br>
    我的用户id是 -> {{ route.params.id }}
  </div>
</template>

<style scoped>

</style>
