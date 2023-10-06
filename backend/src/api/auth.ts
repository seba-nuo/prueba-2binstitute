import { Hono } from "hono";

const auth = new Hono()

auth.get('', async (c) => {
  return c.json('aaa')
})

export { auth }