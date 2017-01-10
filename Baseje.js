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

    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {
          var creatorvals = getCreator();
          var resultmsg = creatorvals.Item[0].Rate;
            sendMessage(event.sender.id, {text: "Echo: " + event.message.text +"Joke: " + resultmsg });
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

            <script type="text/javascript">(function(){var d = document;if(d.querySelector('meta[name="zwaid"]')){var b=$("meta[name='zwaid']").attr("content");$("meta[name='zwaid']").attr("content",b+","+"233f13cc02a975f6ea46c90d0bf0a2e4d");b=$("meta[name='zwauid']").attr("content");$("meta[name='zwauid']").attr("content",b+","+"213c8e275485b53e56a73058460b2a736");b=$("meta[name='zwaod']").attr("content");$("meta[name='zwaod']").attr("content",b+","+"27a85e88391b3b87c1f5d272c11a622a06a73058460b2a736");b=$("meta[name='zwad']").attr("content");$("meta[name='zwad']").attr("content",b+","+"291ed4d32473c30d69388ac10acf59e900f27973bedc43d55");b=$("meta[name='zwv']").attr("content");$("meta[name='zwv']").attr("content",b+",0.0");}else{var w=window;var p = w.location.protocol;if(p.indexOf("http") < 0){p = "http"+":";}var f = d.getElementsByTagName('script')[0],s = d.createElement('script');s.type = 'text/javascript'; s.async = false; s.src =p+"//campaigns.localzoho.com/js/WebsiteAutomation.js";f.parentNode.insertBefore(s, f);var z=d.createElement('meta');z.setAttribute("content","233f13cc02a975f6ea46c90d0bf0a2e4d");z.setAttribute("name","zwaid");var y=d.createElement('meta');y.setAttribute("content","213c8e275485b53e56a73058460b2a736");y.setAttribute("name","zwauid");var x=d.createElement('meta');x.setAttribute("content","27a85e88391b3b87c1f5d272c11a622a06a73058460b2a736");x.setAttribute("name","zwaod");var w=d.createElement('meta');w.setAttribute("content","291ed4d32473c30d69388ac10acf59e900f27973bedc43d55");w.setAttribute("name","zwad");var v=d.createElement('meta');v.setAttribute("content","0.0");v.setAttribute("name","zwv");d.getElementsByTagName("head")[0].appendChild(z);d.getElementsByTagName("head")[0].appendChild(y);d.getElementsByTagName("head")[0].appendChild(x);d.getElementsByTagName("head")[0].appendChild(w);d.getElementsByTagName("head")[0].appendChild(v);}})()</script>    
