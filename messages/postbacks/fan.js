var response = {
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

module.exports = response;