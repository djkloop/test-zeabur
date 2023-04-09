export default defineNuxtRouteMiddleware((to, from) => {
  // eslint-disable-next-line no-console
  console.log(`router change -> ${to.path}`)
})
