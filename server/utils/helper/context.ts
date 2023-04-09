import type { H3Event } from 'h3'

export function getLoginUid(event: H3Event) {
  return event.context.auth.uid ?? 0
}
