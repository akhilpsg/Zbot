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

    

app.post('/webhook', function (req, res) {



    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {
            var creatorvals = getCreator(event.message.text);
console.log(creatorvals);
            sendMessage(event.sender.id, {text: "You Asked Price for : " + event.message.text +". Current Price is $: " + creatorvals + "." });
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



function getCreator(prcode) {
    request({
        url: 'https://creator.zoho.com/api/json/vendor/view/Item_View?scope=creatorapi&authtoken=dba9eaaf1528a1c77885e321fa85e44e&zc_ownername=akhilp2&raw=true'
    }, function(error, response, body){
       re = JSON.parse(body);
       var productcode =[];
            var itemname=[];
            var rate=[];
        var Items = re.Item;

            for (i = 0; i < Items.length; i++) {

                var obj = Items[i];
                for (var key in obj) {
                    vals = obj[key];
                    if (key == "Product_Code") {

                        productcode.push(obj[key]);
                    }
                    if (key == "Item_Name") {


                        itemname.push(obj[key]);
                    }
                    if (key == "Rate") {

                        rate.push(obj[key]);
                    }

                }
            }
    });

var prpos = productcode.indexof(prcode);
var prrate ="Cannot find the product. please check the product again";
if (prpos != -1)
{
prrate = rate[prpos];
}

    return prrate;
};

