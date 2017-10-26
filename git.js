'use strict';
const express = require('express');

const request = require('request');
const path = require('path');
var http = require('http');
var Promise = require("bluebird");
var request_1 = Promise.promisifyAll(require("request"));
let app=express();
//let token = 


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: true
}));

var http = require('http');

// Webhook validation
app.get('/', function(req, res) {
    if (req.query['hub.mode'] === 'subscribe' &&
                req.query['hub.verify_token'] === 'tuxedo_cat') {
                        console.log("Validating webhook");
                res.status(200).send(req.query['hub.challenge']);
          }
  else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
  }
});



// Display the web page
app.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(messengerButton);
    res.end();
});




app.post('/',function(req,res){
	//console.log(req);
        //console.log("Event happenned "+req.body.hook.events[0]);
	//console.log("Project name "+req.body.repository.name);
	//console.log("updated at " + req.body.hook.updated_at);
//	console.log("description" + req.body.description);

	//comments
	if("action" in req.body){
		if(req.body.action==='created')
		{
			console.log("Comment "+ req.body.comment.body+ " has been made by " + req.body.comment.user.login + " on " + req.body.repository.name);
		}

		else if(req.body.action==='opened')
		{
			console.log("A pull request named " + req.body.pull_request.title+ " has been made by " + req.body.sender.login + " to " + req.body.repository.name );
			console.log("Added comments " + req.body.pull_request.body);
		}
		else if(req.body.action==='added')
		{
			console.log("A new coollaborator " + req.body.sender.login + " has been added to project "+ req.body.repository.name )
		}

		else if(req.body.action==='synchronize')
		{
			console.log(req.body.sender.login + "has pushed to " + req.body.repository.name );
			console.log("Also comments added are " + req.body.pull_request.body);
		}
	}


	else if("forkee" in req.body){
		//console.log(entered);
		console.log("Fork has been made to "+req.body.forkee.name+ " by " +req.body.sender.login ) ;
	}
	else if("ref" in req.body){
		if("ref_type" in req.body){
			console.log("A " + req.body.ref_type + " has been made by " + req.body.sender.login);
		}
		console.log("Commit has been made referred to "+ req.body.ref + " by " + req.body.sender.login + " linked to " );
	}
	else {
		console.log(res.body);
	}
	res.sendStatus(200);
})


function sendTextMessage(recipientId, messageText) {
        var messageData = {
                recipient: {
                        id: recipientId
                },
                message: {
                        text: messageText
                }
        };
        callSendAPI(messageData);
}



function callSendAPI(messageData) {
        request({
                uri: 'https://graph.facebook.com/v2.6/me/messages',
                qs: { access_token: token },
                method: 'POST',
                json: messageData
        }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                        var recipientId = body.recipient_id;
                        var messageId = body.message_id;
                        console.log("Successfully sent generic message with id %s to recipient %s",
                        messageId,recipientId);
                }
                else {
                        //console.error("Unable to send message.");
                        console.error(response);
                        //console.error(error);
                }
        });
}

// Set Express to listen out for HTTP requests
var server = app.listen(process.env.PORT || 3000, function () {
        console.log("Listening on port %s", server.address().port);
});

