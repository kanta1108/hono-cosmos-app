// app/api/hono/route.ts
import app from '@/server/hono'
import { handle } from 'hono/vercel'

export const runtime = 'nodejs'
export const GET = handle(app)
export const POST = handle(app)
export const DELETE = handle(app)
