import { prismaORM } from '~/server/utils/db/mysql'
import { responseJson } from '~/server/utils/helper'

export default defineEventHandler(async (event) => {
  const uid = getLoginUid(event)
  if (!uid) {
    setResponseStatus(event, 401)
    return responseJson(1, '请先登录！')
  }

  // 查询文集列表
  try {
    const notebooks = await prismaORM.notebooks.findMany({
      where: {
        uid,
      },
    })
    return responseJson(0, 'ok', { list: notebooks })
  }
  catch (error) {
    setResponseStatus(event, 500)
    return responseJson(1, '服务器请求失败')
  }
})
