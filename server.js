const http  = require('http')
const app = require('./index')

const port = 3001;

const server = app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
  });