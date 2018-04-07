class Orga {
    constructor(name){
        this.name = name;
        this.response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Vielen Dank für dein Interesse an unserer Band, "+name+".\nUm mehr zu hören, " +
                    "schau doch einfach bei YouTube oder Spotify rein." +
                    "\n\nDu kannst uns natürlich auch direkt anrufen und mit Keyboarder Alex alles besprechen.\n\nDarüberhinaus kannst du uns eine Mail an bookingkingpin@gmail.com schicken. Wir melden uns innerhalb eines Tages bei dir!\n\nGruß Alex",
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
    }
}

module.exports = Orga;

