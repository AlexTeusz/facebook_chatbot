var response = {
    "attachment": {
        "type": "template",
        "payload": {
            "template_type":"generic",
            "elements":[
                {
                    "title":"Poster",
                    "image_url":"https://smushy.de/kingpin/merch/poster.JPG",
                    "subtitle":"90x60cm Poster.\nPreis: 5,00 EUR",
                    "default_action": {
                        "type": "web_url",
                        "url": "https://smushy.de/kingpin/merch/poster.JPG",
                        "messenger_extensions": false,
                        "webview_height_ratio": "tall"
                    },
                    "buttons":[
                        {
                            "type": "postback",
                            "title": "Anfragen",
                            "payload": "poster"

                        }
                    ]
                },
                {
                    "title":"Kingpin Beutel",
                    "image_url":"https://smushy.de/kingpin/merch/beutelSmall.JPG",
                    "subtitle":"Preis: 5,00 EUR",
                    "default_action": {
                        "type": "web_url",
                        "url": "https://smushy.de/kingpin/merch/beutelLarge.JPG",
                        "messenger_extensions": false,
                        "webview_height_ratio": "tall"
                    },
                    "buttons":[
                        {
                            "type": "postback",
                            "title": "Anfragen",
                            "payload": "beutel"
                        }
                    ]
                },
                {
                    "title":"T-Shirt (Herren/Damen)",
                    "image_url":"https://smushy.de/kingpin/merch/shirtSmall.JPG",
                    "subtitle":"Preis: 15,00 EUR",
                    "default_action": {
                        "type": "web_url",
                        "url": "https://smushy.de/kingpin/merch/shirtLarge.JPG",
                        "messenger_extensions": false,
                        "webview_height_ratio": "tall"
                    },
                    "buttons":[
                        {
                            "type": "postback",
                            "title": "Anfragen",
                            "payload": "tshirt"
                        }
                    ]
                },
                {
                    "title":"Set (Shirt+Beutel)",
                    "image_url":"https://smushy.de/kingpin/merch/set.JPG",
                    "subtitle":"Kingpin Merch Set\nPreis: 20,00 EUR",
                    "default_action": {
                        "type": "web_url",
                        "url": "https://smushy.de/kingpin/merch/set.JPG",
                        "messenger_extensions": false,
                        "webview_height_ratio": "tall"
                    },
                    "buttons":[
                        {
                            "type": "postback",
                            "title": "Anfragen",
                            "payload": "set"
                        }
                    ]
                }
            ]
        }
    }
};

module.exports = response;