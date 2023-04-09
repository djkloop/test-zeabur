<script setup lang="ts">
const router = useRouter()
const route = useRoute()

function handleToHome() {
  router.push('/')
}
</script>

<template>
  <div>
    {{ route.query.username ?? '李' }}作为一个about-[{{ route.query.id ?? '1' }}]页面我也很无奈啊<br>
    <TButton @click="handleToHome">
      返回首页
    </TButton>
  </div>
</template>

<style scoped></style>
