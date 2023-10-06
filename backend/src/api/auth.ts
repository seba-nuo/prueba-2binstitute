import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod'
import { validateUser } from "../service/auth";


const auth = new Hono()

auth.post('', zValidator(
  'json',
  z.object({
    email: z.string().email(),
    password: z.string(),
  })
), async (c) => {
  const body = c.req.valid('json')
  const isValid = await validateUser(body)
  return c.json({
    'success': isValid
  })
})

export { auth }