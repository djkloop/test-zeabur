import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { prismaORM } from '~/server/utils/db/mysql'
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
    id: z.number({
      required_error: '文集id不能为空',
    }),
  })

  try {
    NoteBook.parse(body)
  }
  catch (error: any) {
    const validationError = fromZodError(error)
    return responseJson(1, validationError.message)
  }

  // 删除文集
  try {
    await prismaORM.notebooks.delete({
      where: {
        id_uid: {
          id: body.id,
          uid,
        },
      },
    })
    return responseJson(0, '删除成功')
  }
  catch (error) {
    return responseJson(1, '删除失败')
  }
})
