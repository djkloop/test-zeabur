import { prisma, prismaORM } from '~/server/utils/db/mysql'
import { responseJson } from '~/server/utils/helper'

export default defineEventHandler(async (event) => {
  const uid = getLoginUid(event)
  if (!uid) {
    setResponseStatus(event, 401)
    return responseJson(1, '请先登录！')
  }

  // 获取query参数
  const query = await getQuery(event)

  const page = query?.page ? Number(query.page) : 1
  const take = query?.size ? Number(query.size) : 10
  const skip = (page - 1) * take

  // 获取用户文章
  try {
    const notes = await prismaORM.notes.findMany({
      where: {
        uid,
      },
      skip,
      take,
    })
    return responseJson(0, 'ok', { list: notes })
  }
  catch (error) {
    if (
      error instanceof prisma.Prisma.PrismaClientKnownRequestError
      || error instanceof prisma.Prisma.PrismaClientUnknownRequestError
    )
      return responseJson(1, '查询文章列表失败')

    setResponseStatus(event, 500)
    return responseJson(1, '服务器错误')
  }
})
