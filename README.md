# sails-hook-email

Sends Emails

## Usage

### Sending raw text
```js
sails.hooks.email.send(
    senderEmail, 
    [receiverEmail1, receiverEmail2],
    'Your email title as String',
    rawString, // use this if you want to send raw text
    null, // html message
    function(err) {
      if (err) {
        console.log(err);
      } else {
        // All went well
      }
    });
```

### Sending HTML content
```js
sails.hooks.email.send(
    senderEmail, 
    [receiverEmail1, receiverEmail2],
    'Your email title as String',
    null, // use this if you want to send raw text
    messageAsHtmlk, // html message
    function(err) {
      if (err) {
        console.log(err);
      } else {
        // All went well
      }
    });
```

### Promises
```js
sails.hooks.email.send(
    senderEmail, 
    [receiverEmail1, receiverEmail2],
    'Your email title as String',
    null, // use this if you want to send raw text
    messageAsHtmlk).then(function() {
        // all went well
    }, function(err) {
        // Jaysus, something went loopy
    });
```
