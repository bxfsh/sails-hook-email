/* global sails:true */
var nodemailer 		= require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var promise 	 		= require('promised-io/promise');

/**
 * Email Service
 * @type {Object}
 */
module.exports = function Email(sails) {

	return {

		/**
		 * Sends an email
		 *
		 * @param  {array} to      array of emails to send
		 * @param  {string} subject title of the email
		 * @param  {string} text    body
		 * @param  {string} html    body
		 * @param  {fucntion} callback function
		 * @return void
		 */
		send: function send( to, subject, text, html, callback ) {

			'use strict';

			console.log(`[sails-hook-email] sending email to ${to}`);

			if (sails.config.email)
				console.log(`[sails-hook-email] credentials are ${sails.config.email}`);

			var deferred = promise.defer();
			var transporter = nodemailer.createTransport(smtpTransport({
		    host: 'smtp.sendgrid.net',
		    port: 25,
		    auth: {
		      user: sails.config.email ? sails.config.email.user : sails.config.user,
	        pass: sails.config.email ? sails.config.email.password : sails.config.password
		    }
			}));
			var mailOptions = {
		    from: 'Boxfish Team<team@boxfish.com>',
		    to: to.join(','),
		    subject: subject
			};

			/**
			 * after send message
			 * @param  {[type]} res [description]
			 * @return {[type]}     [description]
			 */
			var onAfterSend = function onAfterSend(res) {
				if (typeof callback !== 'undefined') callback(res);
				else {
					if (res && res.responseCode !== 200)
						deferred.reject(res);
					else
						deferred.resolve(res);
				}
			};

			if ( html && html !== null ) {

				// send HTML email

				this._getHtml(html, function( html ) {
					mailOptions.html = html;
					transporter.sendMail(mailOptions, onAfterSend);
				});

			} else {

				// send regular email

				mailOptions.text = text;
				transporter.sendMail(mailOptions, onAfterSend);
			}

			return deferred;

		},

		/**
		 * get the html for the email
		 * @param  {[type]}   body [description]
		 * @param  {Function} cb   [description]
		 * @return {[type]}        [description]
		 */
		_getHtml: function _getHtml( body, cb ) {

			'use strict';

			var fs = require('fs');
			var filename = '../sails-hook-email/templates/email.html';

			sails.log.verbose(__filename);

			if (fs.existsSync(filename)) {

				sails.log.verbose('EmailService get html');

				fs.readFile(filename, 'utf8', function(err, data) {
			  	if (err) throw err;
					cb(data.replace('{body}', body));
				});

			} else {

				cb(body);

			}

		}
	}

};
