import { request } from 'undici'
import Ajv from 'ajv'
import { PORT } from '../common/env'
import { AddUserResponseSchema } from '../common/schemas'
import { readBody } from './readBody'

/** A type guard function for validating the Add User API response */
function isAddUserResponse (responseData: unknown): responseData is AddUserResponseSchema {
  const ajv = new Ajv().addKeyword('kind')

  return ajv.validate(AddUserResponseSchema, responseData)
}

async function run () {
  try {
    const { body } = await request(`http://localhost:${PORT}/add-user`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          id: '123',
          name: 'Clippy'
        }
      }),
      headers: { 'content-type': 'application/json' }
    })
  
    const data = await readBody(body)
  
    const addUserResponse = JSON.parse(data)

    if (isAddUserResponse(addUserResponse)) {
      console.log(addUserResponse.message)
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

run()
