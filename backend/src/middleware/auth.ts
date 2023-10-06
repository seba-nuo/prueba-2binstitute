import { Hono } from "hono";
import { jwt } from 'hono/jwt'

// for demo
const secret = 'it-is-very-secret'

const authMiddleware = new Hono()

authMiddleware.use('*', jwt({ secret }))

export { authMiddleware }

// import { User } from "../model/user";
// import { compareSync } from "bcrypt";

// async function validateUser({ email, password, role }) {
//   const user = await User.findOne({
//     email,
//   })
//   if (user === null) {
//     return false
//   }

//   return compareSync(password, user.password)
// }

// export { validateUser }