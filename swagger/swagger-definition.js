module.exports = {

  openapi: '3.0.0',
  info: {
    title: 'Company Service',
    version: '1.0.0',
    description:
        'Documentation des routes'
  },
  servers: [
    {
      url: 'http://localhost:4000/api',
      description: 'Documentation Company Service'
    }
  ]
}
