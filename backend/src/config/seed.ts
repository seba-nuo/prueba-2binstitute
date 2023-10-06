import bcrypt from 'bcrypt';
import { User } from "../model/user";
import { db } from "./db";

const seedUsers = [
  {
    email: 'johndoe@example.com',
    password: bcrypt.hashSync('password123', 10),
    role: 'Admin'
  },
  {
    email: 'foo@bar.com',
    password: bcrypt.hashSync('password123', 10),
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
