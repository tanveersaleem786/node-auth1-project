const server = require("./server")

const port = process.env.PORT || 9090

server.listen(port, () => `Server running at ${port}`)