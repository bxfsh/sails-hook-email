# sails-hook-email

Sends Emails

## Instalation

The latest version of sails should load the hooks automatically just by npm installing

```
npm i https://github.com/bxfsh/sails-hook-email.git --save
```

In an older version of Sails, that does not support it you can create the directory `/api/hooks` and add a file called `email.js`, with the following content

```js
npm i https://github.com/bxfsh/sails-hook-email.git --save
```
> You need to install the package regardless

```js
module.exports = require('sails-hook-email');
```

## Configuration

In your `/config/globals.js` add the following

```js
emailSender: {
    user: 'smtp user name',
    password: 'smtp password'
},
```

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
        // Handle Error
    });
```
