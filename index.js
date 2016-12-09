var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 3000));

// Server frontpage
app.get('/', function (req, res) {
    res.send('This is TestBot Server');
});

// Facebook Webhook
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'testbot_verify_token') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});


app.get('/mydat', function(req, res) {
 var options = {
host: 'www.google.com',
port: 80,
method: 'GET'
};

var req = http.request(options, function(res)
{

res.setEncoding('utf8');
var content;
res.on('data', function (chunk)
{
  // chunk contains data read from the stream
  // - save it to content
  content += chunk;
});

res.on( 'end' , function()
{
  // content is read, do what you want
  console.log( content );
});


});
req.end();
});

app.post('/webhook', function (req, res) {
    var events = req.body.entry[0].messaging;
    var botmsg ="variable value";

    for (i = 0; i < events.length; i++) {
        var event = events[i];

        if (event.message && event.message.text) {
            sendMessage(event.sender.id, {text: "Echo: " + message});
        }
    }
    res.sendStatus(200);
});
    
function sendMessage(recipientId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: recipientId},
            message: message,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};


function getrecords(recipientId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: recipientId},
            message: message,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};


