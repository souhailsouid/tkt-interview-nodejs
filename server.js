const express = require('express')

const cors = require('cors')
const Router = require('./routes/Routes')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerDefinition = require('./swagger/swagger-definition')

const paginate = require('express-paginate')

const options = {
  swaggerDefinition,
  apis: ['./routes/Routes.js']
}

const swaggerSpec = swaggerJsdoc(options)

const app = express()

app.disable('x-powered-by')

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

app.use(paginate.middleware(10, 50))

app.get('/', (_req, res) => {
  res.send('Hello, welcome to Express!')
})

app.use('/api/', Router)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const apiPort = process.env.PORT || 4000
const server = app.listen(apiPort, () => console.log(`Server listen on port ${apiPort}`))

module.exports = server
