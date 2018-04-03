<h1>Facebook Messenger Chatbot</h1>

**General** <br>
Simple Facebook Messenger Chatbot for my bands FB page. Shows several information for fans or organizers. 

**Globals** <br>
The **PAGE ACCESS TOKEN** and **VERIFY TOKEN**, which are both important for the configuration, are stored in globals/globals.js. The file looks like this: 

```
var globalConfig = {
    PAGE_ACCESS_TOKEN: "xxx",
    VERIFY_TOKEN: "xxx",
}

module.exports = globalConfig
```

**Main Functionality** <br>
The method **handleMessage()** handles the entire conversation. If there is a *postback*, which means that the bot will answer a button click or a message, the user wrote, the method **handlePostback()** will do the rest. <br>
I use a switch statement to handle the answer for the users texts. Because of a lot of possible answers, the switch statement is huge.

**Links** <br>
I implemented the chatbot with the [Facebook Messenger Plattform]("https://developers.facebook.com/docs/messenger-platform/getting-started"). There you can find **First Steps** to build your own one. 


**Have fun!**