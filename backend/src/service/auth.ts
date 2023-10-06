import { User } from "../model/user";
import { compareSync } from "bcrypt";

async function validateUser({ email, password }) {
  const user = await User.findOne({
    email,
  })
  if (user === null) {
    return false
  }

  return compareSync(password, user.password)
}

export { validateUser }