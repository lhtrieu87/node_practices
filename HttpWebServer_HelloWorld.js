var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text\plain'});
    res.end('Hello World\n');               
}).listen(8124, "127.0.0.1");

console.log('Server is running at http://127.0.0.1:8124');
