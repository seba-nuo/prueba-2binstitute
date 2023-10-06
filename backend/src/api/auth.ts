import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod'
import { validateUser } from "../service/auth";
import { jwt, sign } from "hono/jwt";
import { getUser } from "../service/user";


const auth = new Hono()

auth.get('', jwt({ secret: 'it-is-very-secret' }), async (c) => {
  return c.json({ 'success': true })
})

auth.post('', zValidator(
  'json',
  z.object({
    email: z.string().email(),
    password: z.string(),
  })
), async (c) => {
  const body = c.req.valid('json')
  const isValid = await validateUser(body)

  if (isValid) {
    const token = await sign(body, 'it-is-very-secret')
    return c.json({
      'success': true,
      'token': token
    })
  }
  return c.json({
    'success': false,
  })
})

export { auth }