import { User } from "../model/user";

function getUsers() {
  return User.find()
}

export {getUsers}