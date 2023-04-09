import Utils from '../utils/helper/token'

export default defineEventHandler(async (event) => {
  const token = getHeader(event, 'Authorization')
  if (!token)
    return
  const userAuthInfos = Utils.getToken<{ user_id: number }>(token)
  event.context.auth = { uid: userAuthInfos.user_id }
})
