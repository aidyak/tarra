import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

const app = new Hono()

// Middlewares
app.use('/*', logger())
app.use('/api/*', cors())

// Sample routes
app.get('/api/health', (c) => c.json({ ok: true }))
app.get('/api/hello', (c) => c.text('Hello from Hono'))

const port = Number(process.env.PORT ?? 8787)

console.log(`Hono API running on http://localhost:${port}`)
serve({ fetch: app.fetch, port })
