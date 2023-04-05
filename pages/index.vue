<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div h-100vh>
    <h1>Nuxt Routing set up successfully!</h1>
    <NuxtLink to="/about">
      <SetupButton>
        Go To About
      </SetupButton>
    </NuxtLink>
  </div>
</template>
