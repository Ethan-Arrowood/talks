import { Readable } from 'stream'

export async function readBody (body: Readable) {
  body.setEncoding('utf-8')

  let data = ''
  for await (const chunk of body) {
    data += chunk
  }

  return data
}