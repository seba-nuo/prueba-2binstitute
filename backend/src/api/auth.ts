import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod'
import { validateUser } from "../service/auth";
import { jwt, sign, verify } from "hono/jwt";
import { getUser } from "../service/user";


const auth = new Hono()

auth.use('', jwt({ secret: 'it-is-very-secret' }))

auth.get('', async (c) => {
  const payload = c.get('jwtPayload')
  return c.json({ 'success': true })
})

// handle login
auth.post('login', zValidator(
  'json',
  z.object({
    email: z.string().email(),
    password: z.string(),
  })
), async (c) => {
  const body = c.req.valid('json')
  const isValid = await validateUser(body)
  const user = await getUser(body.email)

  if (user === null) {
    return c.json({
      'success': false,
      'data': 'user not found',
    })
  }
  const { email, role } = user

  if (isValid && user.role === 'Admin') {
    // this secrect should be in a .env
    const token = await sign({
      email, role
    }, 'it-is-very-secret')
    return c.json({
      'success': true,
      'token': token
    })
  }

  if (user?.role == 'User') {
    return c.json({
      'success': false,
      'data': 'bad role',
    })
  }

  return c.json({
    'success': false,
    'data': 'server error',
  })
})

export { auth }