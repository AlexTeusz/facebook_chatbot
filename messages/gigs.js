var response = {
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

module.exports = response;