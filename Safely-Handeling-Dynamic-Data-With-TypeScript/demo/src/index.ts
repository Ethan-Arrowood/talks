import fastify from 'fastify'
import createServer from './server'

async function run() {
	const app = fastify()
	app.register(createServer)
	await app.ready()
	const address = await app.listen(0)
	console.log(`fastify app listening on ${address}`)
	console.log(app.printRoutes())
}

run()