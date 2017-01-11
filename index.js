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
//tmpmsg ='{"attachment": { "type": "template", "payload": { "template_type": "button", "text": "What do you want to do next?", "buttons": [{ "type": "postback", "title": "Product Name", "payload": "Enter Your Product Name" }, { "type": "postback", "title": "Product Code", "payload": "Enter Your Product Code" }] } } }'
            //sendMessage("1136970429751020", tmpmsg);


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




    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        var fbuserdata = GetFBUser(event.sender.id);
        //console.log(JSON.stringify(fbuserdata));
var fbuserfname= fbuserdata.first_name;
var fbuserlname= fbuserdata.last_name;
var fbuserid = event.sender.id;
        if (event.message && event.message.text) {
          var creatorvals = getCreator();
          ratearr=[];
          itemnamearr=[];
          productcodearr=[];
          for(i=0;i<creatorvals.Item.length;i++){
            var allitems= creatorvals.Item[i];
            for(var key in allitems){
                if(key == "Product_Code"){
                    productcodearr.push(allitems[key]);
                }
                  if(key == "Item_Name"){
                    itemnamearr.push(allitems[key]);
                }
                  if(key == "Rate"){
                    ratearr.push(allitems[key]);
                }

            }
          }
          var prpos = productcodearr.indexOf(event.message.text);
          var itempos = itemnamearr.indexOf(event.message.text);
          var noresults = fbuserfname +" "+fbuserlname+", "+"Your search - '" + event.message.text + "' - did not match any records. Please choose the appropriate option below.";
           var botqus = '{"attachment": { "type": "template", "payload": { "template_type": "button", "text": "'+noresults+'", "buttons": [{ "type": "postback", "title": "Product Name", "payload": "Enter Your Product Name" }, { "type": "postback", "title": "Product Code", "payload": "Enter Your Product Code" }] } } }';
          if(prpos!=-1){ rate = ratearr[prpos]; 
                itemname=itemnamearr[prpos];
                                botmsg ="Product Code: " + event.message.text + "\nProduct Name: "+itemname+"\nRate: "+rate;

                            sendMessage(event.sender.id, {text: botmsg});

          }
           else if(itempos!=-1){ rate = ratearr[itempos]; 
                productcode=productcodearr[itempos];
                botmsg ="Product Name:" + event.message.text + "\nProduct code: "+productcode+"\nRate: "+rate;
                            sendMessage(event.sender.id, {text: botmsg});

          }
          else if (event.message.text== 'hi' || event.message.text == 'hello')
          {

                      var noresults = event.message.text +" "+fbuserfname+"! "+" I am your business bot. I am designed to serve your business.Please choose the appropriate option below to continue.";
                       var botqus = '{"attachment": { "type": "template", "payload": { "template_type": "button", "text": "'+noresults+'", "buttons": [{ "type": "postback", "title": "Product Name", "payload": "Enter Your Product Name" }, { "type": "postback", "title": "Product Code", "payload": "Enter Your Product Code" }] } } }'
                   sendMessage(event.sender.id, {text: botmsg});
          }
          else{
                                      


                            sendMessage(event.sender.id, botqus);


          }
         
        }
        else if (event.postback && event.postback.payload) {
      payload = event.postback.payload;
      // Handle a payload from this sender
                  sendMessage(event.sender.id, {text: payload});

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


function GetFBUser(recipientId) {
    request({
        url: 'https://graph.facebook.com/v2.6/'+recipientId,
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'GET'
    }, function(error, response, body){
       fbuserresp = JSON.parse(body);
fbr = fbuserresp;
        
       
    });
return fbr;

};



function getCreator() {
    request({
        url: 'https://creator.zoho.com/api/json/vendor/view/Item_View?scope=creatorapi&authtoken=dba9eaaf1528a1c77885e321fa85e44e&zc_ownername=akhilp2&raw=true',
    }, function(error, response, body){
       re = JSON.parse(body);
        crresp =re;
    });
    return crresp;
};

