import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod'
import { validateUser } from "../service/auth";
import { authMiddleware } from "../middleware/auth";


const auth = new Hono()

auth.post('', async (c) => {
  const payload = c.get('jwtPayload')
  console.log("🤖 ~ file: auth.ts:12 ~ auth.post ~ payload:", payload);
  
})

export { auth }