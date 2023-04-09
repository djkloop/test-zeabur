import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { prismaORM } from '~/server/utils/db/mysql'
import { genTitle, responseJson } from '~/server/utils/helper'

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
    notebookId: z.number({ required_error: '文集id不能为空' }),
  })

  try {
    NoteBook.parse(body)
  }
  catch (error: any) {
    const validationError = fromZodError(error)
    return responseJson(1, validationError.message)
  }

  try {
    // 创建文章
    const notebook = await prismaORM.notes.create({
      data: {
        title: genTitle(),
        content_md: '',
        state: 2,
        uid,
      },
    })

    try {
      await prismaORM.notebook_notes.create({
        data: {
          note_id: notebook.id,
          notebook_id: body.notebookId,
        },
      })
      return responseJson(0, '创建文案成功')
    }
    catch (error) {
      return responseJson(1, '创建文案失败')
    }
  }
  catch (error) {
    return responseJson(1, '创建文章失败')
  }
})
