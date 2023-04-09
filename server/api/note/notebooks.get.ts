import { prismaORM } from '~/server/utils/db/mysql'
import { responseJson } from '~/server/utils/helper'

export default defineEventHandler(async () => {
  // 查询所有文集列表
  try {
    const notebooks = await prismaORM.notebooks.findMany()
    return responseJson(0, 'ok', { list: notebooks })
  }
  catch (error) {
    return responseJson(1, '查询列表失败')
  }
})
