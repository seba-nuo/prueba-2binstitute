import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { auth } from './api/auth'
import { db } from './config/db'
import { user } from './api/user'

const app = new Hono()

app.route('/auth', auth)
app.route('/user', user)

db().then(() => {
  serve(app)
})