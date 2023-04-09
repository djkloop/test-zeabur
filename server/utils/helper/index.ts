import dayjs from 'dayjs'

export function responseJson(code = 1, msg = '', data?: any) {
  const resp = { code, msg, data }
  return resp
}

export function genTitle() {
  return dayjs().format('YYYY-MM-DD hh:mm:ss')
}
