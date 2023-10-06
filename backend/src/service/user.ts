import { User } from "../model/user";
import { hashSync } from "bcrypt";

async function getAllUsers() {
  const users = await User.find()
  return users.map(user => ({
    email: user.email,
    role: user.role
  }))
}

function getUser(email: string) {
  return User.findOne({
    email
  })
}

function addUser({ email, password, role }) {
  const hashedPass = hashSync(password, 10)

  return User.create({
    email,
    password: hashedPass,
    role,
  })
}

export { getAllUsers, addUser, getUser }