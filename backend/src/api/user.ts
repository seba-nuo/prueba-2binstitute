import { Hono } from "hono";
import { getUsers } from "../service/user";

const user = new Hono()

user.get('', async (c) => {
  const allUsers = await getUsers()
  return c.json(allUsers)
})

export { user }