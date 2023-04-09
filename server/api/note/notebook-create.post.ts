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
    name: z.string().min(1, { message: '文集名称不能为空' }),
  })

  try {
    NoteBook.parse(body)
  }
  catch (error: any) {
    const validationError = fromZodError(error)
    return responseJson(1, validationError.message)
  }

  // 创建文集
  const notebook = await prismaORM.notebooks.create({
    data: {
      uid,
      name: body.name,
    },
  })

  if (!notebook)
    return responseJson(1, '创建文集失败')

  return responseJson(0, '创建文集成功')
})
