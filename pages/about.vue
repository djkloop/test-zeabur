<script setup lang="ts">
const router = useRouter()
function handleToHome() {
  router.push('/')
}
</script>

<template>
  <div>
    我作为一个about页面我也很无奈啊
    <TButton @click="handleToHome">
      返回首页
    </TButton>
  </div>
</template>

<style scoped></style>
