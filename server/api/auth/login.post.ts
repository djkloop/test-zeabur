import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import md5 from 'md5'
import { prismaORM } from '~/server/utils/db/mysql'
import { responseJson } from '~/server/utils/helper'
import Utils from '~/server/utils/helper/token'

export default defineEventHandler(async (event) => {
  // 获取数据
  const body = await readBody(event)
  // 校验数据
  const UserInfo = z.object({
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

  // 创建账号 密码加密
  const salt = 'jdfhfh%$##$#@$F#dslf2ehin'
  const mdPassword = md5(md5(md5(md5(body.password) + salt)))

  // 查询数据库
  const user = await prismaORM.users.findFirst({
    where: {
      phone: body.phone,
      password: mdPassword,
    },
    select: {
      nickname: true,
      id: true,
      phone: true,
    },
  })

  if (!user)
    return responseJson(1, '账号不存在或者密码错误！')

  // 生成token
  const token = await Utils.setToken(user.nickname, user.id)

  return responseJson(0, '登录成功！', { accessToken: token, userInfo: user })
})
