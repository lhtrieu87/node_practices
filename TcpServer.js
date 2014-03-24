var net = require('net');
var chatServer = net.createServer();

var clientList = [];

chatServer.on('connection', function(client) {
    client.name = client.remoteAddress + ':' + client.remotePort;
    client.write('Hi ' + client.name + '!\n');
    console.log(client.name + " joined!");

    clientList.push(client);

    client.on('data', function(data) {
        broadcast(data, client);
    });

    client.on('end', function() {
        console.log(client.name + ' quit!');
        clientList.splice(clientList.indexOf(client), 1);
    });

    client.on('error', function(e) {
        console.log(e);
    });
});

function broadcast(message, sender) {
    for(var i = 0; i < clientList.length; i++) {
        if(sender != clientList[i]) {
            clientList[i].write(sender.name + " says " + message);        
        }
    }
}

chatServer.listen(9000);
