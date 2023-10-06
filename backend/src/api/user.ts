import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { getAllUsers, addUser } from "../service/user";
import { jwt } from "hono/jwt";

const user = new Hono()

user.use('/auth/*', jwt({
  secret: 'it-is-very-secret',
}))

user.get('auth/getAllUsers', async (c) => {
  const payload = c.get('jwtPayload')
  const allUsers = await getAllUsers()
  return c.json(allUsers)
})

user.post('', zValidator(
  'json',
  z.object({
    email: z.string().email(),
    password: z.string(),
    role: z.string().refine((role) => ['Admin', 'User'].includes(role)),
  })
), async (c) => {
  const body = c.req.valid('json')
  try {
    await addUser(body);
    return c.json({
      'success': true,
    });
  } catch (e) {
    const EMAIL_EXIST = 11000

    if (e.code === EMAIL_EXIST) {
      return c.json({
        'success': false,
        'error': "email already exist",
      });
    }
    return c.json({
      'success': false,
      'error': 'server error'
    })
  }
})

export { user }