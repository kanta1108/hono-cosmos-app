// server/routes/favorites.ts
import { Hono } from 'hono'
import { getContainer } from '@/lib/cosmos'

const favorites = new Hono()

favorites.get('/', async (c) => {
  const container = await getContainer()
  const { resources } = await container.items.readAll().fetchAll()
  return c.json(resources)
})

favorites.post('/', async (c) => {
  const data = await c.req.json()
  const container = await getContainer()
  const { resource } = await container.items.create(data)
  return c.json(resource)
})

favorites.delete('/', async (c) => {
  const { id } = await c.req.json()
  const container = await getContainer()
  await container.item(id, id).delete()
  return c.json({ success: true })
})

export default favorites
