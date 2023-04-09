export default defineNuxtRouteMiddleware((to, from) => {
  const user = !!to.query.id
  if (!user)
    return navigateTo('/login')
})
