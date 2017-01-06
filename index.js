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

app.get('/chuck', function (req, res) {

 
var options = {
  url: 'http://api.icndb.com/jokes/random'
  
};
 
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    if (!error && response.statusCode == 200) {
                    re = JSON.parse(body);
                     res.send(re.value.joke) // Show the HTML for the Google homepage.
                }
  }
}
 
request(options, callback);
   /*request('http://api.icndb.com/jokes/random', 
        function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    re = JSON.parse(body);
                     res.send(re.type) // Show the HTML for the Google homepage.
                }
        })*/
    });


app.post('/webhook', function (req, res) {

var cnjoke123 ="new var";
var creatorvals = getCreator();
    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {
            sendMessage(event.sender.id, {text: "Echo: " + event.message.text +"Joke: " + creatorvals });
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
    }, function(error, response, body){
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};



function getCreator() {
    request({
        url: 'https://creator.zoho.com/api/json/vendor/view/Item_View?scope=creatorapi&authtoken=dba9eaaf1528a1c77885e321fa85e44e&zc_ownername=akhilp2&raw=true',
    }, function(error, response, body){
       re = JSON.parse(body);
        resjoke =re;
    });
    return resjoke;
};

