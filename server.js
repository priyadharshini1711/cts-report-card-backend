const http  = require('http')
const app = require('./index')

const port = process.env.PORT || 3001;

const server = http.createServer(app);

app.listen(port, () => {
    console.log(`server is running in the port ${port}`)
});