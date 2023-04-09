import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import md5 from 'md5'
import { omit } from 'lodash-es'
import { prismaORM } from '~/server/utils/db/mysql'
import { responseJson } from '~/server/utils/helper'

export default defineEventHandler(async (event) => {
  // 获取数据
  const body = await readBody(event)
  // 校验数据
  const UserInfo = z.object({
    nickname: z.string().min(1, { message: '昵称不能为空' }),
    confirmPassword: z.string().min(1, { message: '确认密码不能为空' }),
    password: z.string().min(1, { message: '密码不能为空' }),
    phone: z.string().regex(/^1[3456789]\d{9}$/, { message: '手机号格式不正确' }),
  })

  try {
    UserInfo.parse(body)
  }
  catch (error: any) {
    const validationError = fromZodError(error)
    return responseJson(1, validationError.message)
  }

  // 查询数据库
  const searchUser = await prismaORM.users.findFirst({
    where: {
      phone: body.phone,
    },
  })

  if (searchUser)
    return responseJson(1, '账号已注册！')

  // 创建账号 密码加密
  const salt = 'jdfhfh%$##$#@$F#dslf2ehin'
  const mdPassword = md5(md5(md5(md5(body.password) + salt)))
  const createUser = await prismaORM.users.create({
    data: {
      ...omit(body, ['confirmPassword', 'password']),
      password: mdPassword,
    },
  })

  if (createUser)
    return responseJson(1, '注册成功')

  return {
    ...body,
  }
})
