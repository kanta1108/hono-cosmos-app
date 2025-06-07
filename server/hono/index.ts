// server/hono/index.ts
import { Hono } from 'hono'
import favorites from '../routes/favorites'
// import users from '../routes/users' ← 将来ここに追加可能

const app = new Hono()

app.route('/api/favorites', favorites)

export default app
