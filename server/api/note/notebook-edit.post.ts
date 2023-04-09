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

  // 编辑文集
  try {
    const notebook = await prismaORM.notebooks.update({
      data: {
        name: body.name,
      },
      where: {
        id_uid: {
          id: body.id,
          uid,
        },
      },
      select: {
        name: true,
      },
    })

    if (!notebook)
      return responseJson(1, '修改失败')

    return responseJson(0, '修改成功')
  }
  catch (error) {
    setResponseStatus(event, 500)
    return responseJson(1, '服务器错误')
  }
})
