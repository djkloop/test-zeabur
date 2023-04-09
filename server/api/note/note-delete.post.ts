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

  // 获取数据
  const body = await readBody(event)
  // 校验数据
  const NoteBook = z.object({
    noteId: z.number({ required_error: '文章id不能为空' }),
  })

  try {
    NoteBook.parse(body)
  }
  catch (error: any) {
    const validationError = fromZodError(error)
    return responseJson(1, validationError.message)
  }

  try {
    // 修改文章
    await prismaORM.notes.delete({
      where: {
        id_uid: {
          id: body.noteId,
          uid,
        },
      },
    })
    return responseJson(0, '删除文章成功')
  }
  catch (error) {
    if (error instanceof prisma.Prisma.PrismaClientKnownRequestError)
      return responseJson(1, '文章不存在！')

    return responseJson(1, '删除文章失败')
  }
})
