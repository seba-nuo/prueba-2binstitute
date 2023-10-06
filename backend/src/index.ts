import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { auth } from './api/auth'
import { db } from './config/db'
import { user } from './api/user'

const app = new Hono()
app.use('*', cors())

app.route('/auth', auth)
app.route('/user', user)

db().then(() => {
  serve(app)
})