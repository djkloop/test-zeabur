import path from 'node:path'
import fs from 'node:fs'
import dayjs from 'dayjs'
import md5 from 'md5'
import { responseJson } from '~/server/utils/helper'
import { prismaORM } from '~/server/utils/db/mysql'

export default defineEventHandler(async (event) => {
  const uid = getLoginUid(event)
  if (!uid) {
    setResponseStatus(event, 401)
    return responseJson(1, '请先登录！')
  }

  // 获取数据
  const body = await readMultipartFormData(event)

  if (body) {
    if (body[0].type !== 'image/jpeg' && body[0].type !== 'image/png' && body[0].type !== 'image/jpg' && body[0].type !== 'image/webp')
      return responseJson(1, '请上传图片格式为jpg、png、webp的文件！')

    // md5用户id
    // TODO: 检测文件名是否重复，防止重复上传
    const mUserFile = md5(uid)
    // 图片名称
    const filename = `${mUserFile}.${dayjs().valueOf()}.${body[0].filename}`
    // 图片存放路径
    const filePath = path.join('./public', 'img', filename)
    // 图片数据
    const buffer = body[0].data
    try {
      fs.writeFileSync(filePath, buffer)

      // 插入数据库
      const avatarUrl = `/img/${filename}`
      try {
        // 修改用户头像
        const user = await prismaORM.users.update({
          data: {
            avatar: avatarUrl,
            updated_at: new Date(),
          },
          where: {
            id: uid,
          },
          select: {
            avatar: true,
          },
        })
        return responseJson(0, '修改头像成功！', { ...user })
      }
      catch (error) {
        return responseJson(1, '修改头像失败！')
      }
    }
    catch (error) {
      return responseJson(1, '修改头像失败！')
    }
  }
})
