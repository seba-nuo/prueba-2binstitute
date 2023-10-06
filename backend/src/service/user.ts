import { User } from "../model/user";
import { hashSync } from "bcrypt";

function getAllUsers() {
  return User.find()
}

function addUser({ email, password, role }) {
  const hashedPass = hashSync(password, 10)

  return User.create({
    email,
    password: hashedPass,
    role,
  })
}

export { getAllUsers, addUser }