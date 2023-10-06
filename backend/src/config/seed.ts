import { User } from "../model/user";
import { db } from "./db";

const seedUsers = [
  {
    email: 'johndoe@example.com',
    password: 'password123',
    role: 'Admin'
  },
  {
    email: 'foo@bar.com',
    password: 'password123',
    role: 'User'
  }
]

async function seed() {
  await db().then((db) => {
    User.create(seedUsers).then(() => db.disconnect())
  }).catch((e) => {
    console.log(e)
  })
}

seed()
