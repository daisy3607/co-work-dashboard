const app = require('express')();
const http = require('http').createServer(app);
const io = require("socket.io");
const PORT = 4000;

let data = ['test', 'hihi'];
let proposal = [
    {title: 'aabbb', good:0, bad:1}
  ]

app.get('/data', (req, res) => {
    res.send({data: data});
});

app.get('/proposal', (req, res) => {
    res.send({data: proposal});
});

const server = io.listen(8888);
server.on("connection", (socket) => {
    socket.on('add new task', function(title) {
        // add msg to database
        proposal.push({title: title, good: 0, bad: 0});
        
        server.emit('add task', title);
    });

});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
