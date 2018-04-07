'use strict';
const request = require('request');
const Globals = require("./globals/globals");

const PAGE_ACCESS_TOKEN = Globals.PAGE_ACCESS_TOKEN;

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {

  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function(entry) {

          // Gets the body of the webhook event
          let webhook_event = entry.messaging[0];
          console.log(webhook_event);


          // Get the sender PSID
          let sender_psid = webhook_event.sender.id;
          console.log('Sender PSID: ' + sender_psid);

          // Check if the event is a message or postback and
          // pass the event to the appropriate handler function
          if (webhook_event.message) {
              handleMessage(sender_psid, webhook_event.message);
          } else if (webhook_event.postback) {
              handlePostback(sender_psid, webhook_event.postback);
          }

      });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = Globals.VERIFY_TOKEN;

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

var first = true;
var botStatus = true;
// Handles messages events
function handleMessage(sender_psid, received_message) {
    let response;

    request('https://graph.facebook.com/v2.6/'+sender_psid+'?fields=first_name,last_name&access_token='+PAGE_ACCESS_TOKEN, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body);

        var name;
        if (body !== undefined){
            name = body["first_name"];
        }else{
            name = ""
        }

        if (received_message.text) {
            // Create the payload for a basic text message, which
            // will be added to the body of our request to the Send API
            // ${received_message.text}

            if (received_message.text.toLowerCase() === "bot start"){
                botStatus = true;
            }

            if (botStatus){
                switch (received_message.text.toLowerCase()) {
                    case "bot stop":
                        botStatus = false;
                        break;
                    case "ciao":
                    case "tschüss":
                    case "auf wiedersehen":
                    case "bis dann":
                    case "man sieht sich":
                        first = true;
                        botStatus = true;
                        response = {
                            "text": "Auf Wiedersehen "+name+" :) Ich hoffe dir ein wenig geholfen zu haben. Ich melde mich bei dir!"
                        };
                        break;
                    case "merchandise":
                    case "merch":
                    case "fanartikel":
                        response = {
                            "attachment": {
                                "type": "template",
                                "payload": {
                                    "template_type":"generic",
                                    "elements":[
                                        {
                                            "title":"Poster",
                                            "image_url":"https://smushy.de/kingpin/pressebild.png",
                                            "subtitle":"90x60cm Poster",
                                            "default_action": {
                                                "type": "web_url",
                                                "url": "https://smushy.de/kingpin/pressebild.png",
                                                "messenger_extensions": false,
                                                "webview_height_ratio": "tall"
                                            },
                                            "buttons":[
                                                {
                                                    "type": "postback",
                                                    "title": "Anfragen",
                                                    "payload": "kaufen"

                                                }
                                            ]
                                        },
                                        {
                                            "title":"Poster",
                                            "image_url":"https://smushy.de/kingpin/pressebild.png",
                                            "subtitle":"90x60cm Poster",
                                            "default_action": {
                                                "type": "web_url",
                                                "url": "https://smushy.de/kingpin/pressebild.png",
                                                "messenger_extensions": false,
                                                "webview_height_ratio": "tall"
                                            },
                                            "buttons":[
                                                {
                                                    "type": "postback",
                                                    "title": "Anfragen",
                                                    "payload": "kaufen"
                                                }
                                            ]
                                        },
                                        {
                                            "title":"Poster",
                                            "image_url":"https://smushy.de/kingpin/pressebild.png",
                                            "subtitle":"90x60cm Poster",
                                            "default_action": {
                                                "type": "web_url",
                                                "url": "https://smushy.de/kingpin/pressebild.png",
                                                "messenger_extensions": false,
                                                "webview_height_ratio": "tall"
                                            },
                                            "buttons":[
                                                {
                                                    "type": "postback",
                                                    "title": "Anfragen",
                                                    "payload": "kaufen"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        };
                        break;
                    case "gigs":
                    case "konzerte":
                    case "veranstaltungen":
                        response = {
                            "attachment":{
                                "type":"template",
                                "payload":{
                                    "template_type":"list",
                                    "top_element_style":"large",
                                    "elements":[
                                        {
                                            "title":"Lager Rock",
                                            "image_url":"https://smushy.de/kingpin/gigs/pics/lagerrock.jpg",
                                            "subtitle":"21.04.2018 in Borken",
                                            "buttons":[
                                                {
                                                    "type":"web_url",
                                                    "url":"https://www.facebook.com/LagerRock/",
                                                    "title":"Zeig her"
                                                }
                                            ]
                                        },
                                        {
                                            "title":"Album Aufnahme",
                                            "image_url":"https://smushy.de/kingpin/pressebild.png",
                                            "subtitle":"Wir nehmen gerade unser Album auf!",
                                            "buttons":[
                                                {
                                                    "type":"web_url",
                                                    "url":"https://www.facebook.com/dieletztebandderstadt/",
                                                    "title":"Zeig her"
                                                }
                                            ]
                                        },
                                    ]
                                }
                            }
                        };
                        break;
                    case "veranstalter":
                        response = {
                            "attachment": {
                                "type": "template",
                                "payload": {
                                    "template_type": "button",
                                    "text": "Vielen Dank für dein Interesse an unserer Band, "+name+".\nUm mehr zu hören, " +
                                    "schau doch einfach bei YouTube oder Spotify rein." +
                                    "\n\nDu kannst uns natürlich auch direkt anrufen und mit Keyboarder Alex alles besprechen.",
                                    "buttons": [
                                        {
                                            "type": "web_url",
                                            "title": "YouTube",
                                            "url": "https://www.youtube.com/user/BandKingPin",
                                        },
                                        {
                                            "type": "web_url",
                                            "title": "Spotify",
                                            "url": "https://open.spotify.com/artist/065dEH9ZT83Eg9YVdT91lS?si=lS4E0bnATiWVLMlB_oYbzw",
                                        },
                                        {
                                            "type": "phone_number",
                                            "title": "Anrufen",
                                            "payload": "+4915142326427",
                                        }
                                    ]
                                }
                            }
                        };
                        break;
                    default:
                        if (first){
                            response = {
                                "attachment": {
                                    "type": "template",
                                    "payload": {
                                        "template_type": "button",
                                        "text": 'Hi '+name+'\n\nSchön, dass du uns geschrieben hast. Wir melden uns so schnell wie möglich bei dir! Vielleicht kann ich dir auch jetzt schon helfen.\nBist du Veranstalter oder möchtest du uns einfach so schreiben?',
                                        "buttons": [
                                            {
                                                "type": "postback",
                                                "title": "Einfach so",
                                                "payload": "fan",
                                            },
                                            {
                                                "type": "postback",
                                                "title": "Veranstalter",
                                                "payload": "veranstalter",
                                            }
                                        ]
                                    }
                                }
                            };
                            first = false
                        }else{
                            response = {
                                "attachment": {
                                    "type": "template",
                                    "payload": {
                                        "template_type": "button",
                                        "text": "Kann ich dir sonst noch weiterhelfen?",
                                        "buttons": [
                                            {
                                                "type": "postback",
                                                "title": "Ja",
                                                "payload": "ja",
                                            },
                                            {
                                                "type": "postback",
                                                "title": "Nein",
                                                "payload": "nein",
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                }
            }
        } else if (received_message.attachments) {
            // Get the URL of the message attachment
            let attachment_url = received_message.attachments[0].payload.url;
            response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": "Ist das Bild richtig?",
                            "subtitle": "Klick auf einen Button, um zu antworten",
                            "image_url": attachment_url,
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Ja!",
                                    "payload": "yes",
                                },
                                {
                                    "type": "postback",
                                    "title": "Nein!",
                                    "payload": "no",
                                }
                            ],
                        }]
                    }
                }
            }
        }

        // Send the response message
        callSendAPI(sender_psid, response);
    });
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'ja') {
        response = { "text": "Okay, super! Du kannst nach 'gigs' oder nach 'merchandise' fragen. Falls du ein Veranstalter bist, so schreib doch bitte 'veranstalter', damit ich weitermachen kann."}
    } else if (payload === 'nein') {
        botStatus = true;
        first = true;
        response = { "text": "Okay! Dann sind wir hier fertig. Ich wünsch dir noch einen schönen Tag." }
    } else if (payload === 'fan') {
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Vielleicht kann ich dir bis dahin ein bisschen weiterhelfen." +
                    "\nSchreib einfach 'merchandise, merch oder fanartikel', um mehr über unsere Produkte zu erfahren.\nWenn du Infos über die nächsten " +
                    "Konzerte bekommen möchtest, dann screib einfach 'gigs, konzerte oder veranstaltungen'.\n\nIch hab dir unten mal den Link zu unserer Spotify Seite eingefügt. Gruß Alex!",
                    "buttons": [
                        {
                            "type": "web_url",
                            "title": "Spotify",
                            "url": "https://open.spotify.com/artist/065dEH9ZT83Eg9YVdT91lS?si=lS4E0bnATiWVLMlB_oYbzw",
                        }
                    ]
                }
            }
        };
    } else if (payload === 'veranstalter') {
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Vielen Dank für dein Interesse an unserer Band.\nUm mehr zu hören, " +
                    "schau doch einfach bei YouTube oder Spotify rein." +
                    "\n\nDu kannst uns natürlich auch direkt anrufen und mit Keyboarder Alex alles besprechen.",
                    "buttons": [
                        {
                            "type": "web_url",
                            "title": "YouTube",
                            "url": "https://www.youtube.com/user/BandKingPin",
                        },
                        {
                            "type": "web_url",
                            "title": "Spotify",
                            "url": "https://open.spotify.com/artist/065dEH9ZT83Eg9YVdT91lS?si=lS4E0bnATiWVLMlB_oYbzw",
                        },
                        {
                            "type": "phone_number",
                            "title": "Anrufen",
                            "payload": "+4915142326427",
                        }
                    ]
                }
            }
        };
    } else if (payload === "kaufen"){
        response = {
            "text": "Wir freuen uns über dein Interesse an unserem Merch. Ich habe dein Interesse vermerkt und werde mich schnellstmöglich bei dir melden! Gruß Alex"
        }
    }

    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}
