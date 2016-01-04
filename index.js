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
		send: function send(from, to, subject, text, html, callback ) {

			'use strict';

			var deferred = promise.defer();
			var transporter = nodemailer.createTransport(smtpTransport({
		    host: 'smtp.sendgrid.net',
		    port: 25,
		    auth: {
		      user: sails.config.user,
	        pass: sails.config.password
		    }
			}));
			var mailOptions = {
		    from: from,
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
					if (res && res.responseCode !== 200) {
						deferred.reject(res);
					} else {
						deferred.resolve(res);
					}
				}
			};

			if ( html && html !== null ) {

				// send HTML email

				mailOptions.html = html;
				transporter.sendMail(mailOptions, onAfterSend);
			
			} else {

				// send regular email
				
				mailOptions.text = text;
				transporter.sendMail(mailOptions, onAfterSend);
			}

			return deferred;

		}
	}

};