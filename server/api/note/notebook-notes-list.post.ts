import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'
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
  query.notebookId = Number(query.notebookId ?? 0)
  // 校验数据
  const QuerySchema = z.object({
    notebookId: z.number({ required_error: '文集不能为空' }),
  })

  try {
    QuerySchema.parse(query)
  }
  catch (error: any) {
    const validationError = fromZodError(error)
    return responseJson(1, validationError.message)
  }

  // 获取用户文集
  try {
    const notebooks = await prismaORM.notebook_notes.findMany({
      where: {
        notebook_id: Number(query.notebookId ?? 0),
      },
      select: {
        note_id: true,
      },
    })

    if (notebooks.length) {
      const ids = notebooks.map(item => item.note_id)
      const notes = await prismaORM.notes.findMany({
        where: {
          uid,
          id: {
            in: ids,
          },
        },
      })
      return responseJson(0, 'ok', { list: notes })
    }
    return responseJson(0, 'ok', { list: [] })
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
