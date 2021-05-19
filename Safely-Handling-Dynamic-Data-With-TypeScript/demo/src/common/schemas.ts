import { Type, Static } from '@sinclair/typebox'

export const UserSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  employed: Type.Optional(Type.Boolean()),
  company: Type.Optional(Type.String()),
  age: Type.Optional(Type.Number()),
  projects: Type.Optional(Type.Array(Type.String()))
})

export type UserSchema = Static<typeof UserSchema>

export const AddUserRequestSchema = Type.Object({
  user: UserSchema
})

export type AddUserRequestSchema = Static<typeof AddUserRequestSchema>;

export const AddUserResponseSchema = Type.Object({
  message: Type.String()
})

export type AddUserResponseSchema = Static<typeof AddUserResponseSchema>
