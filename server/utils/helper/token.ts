import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../const/token'

export default class Utils {
  static setToken = (user_name: string, user_id: string | number, time: string | number = '7d'): Promise<String> => {
    return new Promise((resolve) => {
      const token = `Bearer ${jwt.sign({
        user_name,
        user_id,
      }, JWT_SECRET_KEY, { expiresIn: time })}`
      resolve(token)
    })
  }

  static getToken = <T>(token: string): T | jwt.JwtPayload => {
    return jwt.verify(token.split(' ')[1], JWT_SECRET_KEY) as T
  }
}
