import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { getAllUsers, addUser } from "../service/user";
import { jwt } from "hono/jwt";

const user = new Hono()
// secret should be in a env
user.get('', jwt({ secret: 'it-is-very-secret' }), async (c) => {
  const allUsers = await getAllUsers()
  return c.json({ data: allUsers, success: true })
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