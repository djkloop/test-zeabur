import { prismaORM } from '~/server/utils/db/mysql'
import { responseJson } from '~/server/utils/helper'

export default defineEventHandler(async (event) => {
  // 获取query参数
  const query = await getQuery(event)

  const page = query?.page ? Number(query.page) : 1
  const take = query?.size ? Number(query.size) : 10
  const skip = (page - 1) * take

  // 查询所有文章列表
  try {
    const notes = await prismaORM.notes.findMany({
      skip,
      take,
    })
    return responseJson(0, 'ok', { list: notes })
  }
  catch (error) {
    return responseJson(1, '查询文章列表失败')
  }
})
