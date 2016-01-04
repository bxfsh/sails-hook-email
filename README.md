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
    messageAsHtml, // html message
    function(err) {
      if (err) {
        console.log(err);
      } else {
        // All went well
      }
    });
```

### Promises

You can also use promises instead of a callback

```js
sails.hooks.email.send(
    senderEmail, 
    [receiverEmail1, receiverEmail2],
    'Your email title as String',
    null, // use this if you want to send raw text
    messageAsHtml)
    .then(function() {
        // all went well
    }, function(err) {
        // Jaysus, something went loopy
    });
```
