import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { getAllUsers, addUser } from "../service/user";

const user = new Hono()

user.get('', async (c) => {
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
  console.log("🤖 ~ file: user.ts:22 ~ ), ~ body:", body);
  try {
    await addUser(body);
    return c.json({
      'success': true,
    });
  } catch (e) {
    if (e.code === 11000) {
      return c.json({
        'success': false,
        'error': "email already exist",
      });
    } else {
      return c.json({
        'success': false,
        'error': 'server error'
      })
    }

  }
})

export { user }