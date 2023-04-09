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
    noteId: z.number({ required_error: '文章id不能为空' }),
    title: z.string({ required_error: '文章标题不能为空' }),
    content_md: z.string({ required_error: '文章内容不能为空' }),
    state: z.number({ required_error: '文章状态不能为空' }),
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
    const note = await prismaORM.notes.update({
      data: {
        title: body.title,
        content_md: body.content_md,
        state: body.state,
        updated_at: new Date(),
      },
      where: {
        id_uid: {
          id: body.noteId,
          uid,
        },
      },
    })
    return responseJson(0, '修改文章成功', { ...note })
  }
  catch (error) {
    return responseJson(1, '修改文章失败')
  }
})
