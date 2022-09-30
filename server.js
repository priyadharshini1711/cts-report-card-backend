const http  = require('http')
const app = require('./index')

const port = 3001;

const server = http.createServer(app);

app.listen(process.env.PORT || port, () => {
    console.log(`server is running in the port ${port}`)
});