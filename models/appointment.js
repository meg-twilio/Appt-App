'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
const cfg = require('../config');
const Twilio = require('twilio');

const AppointmentSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    notification: Number,
    timeZone: String,
    time: {type: Date, index: true}
});

AppointmentSchema.methods.requiresNotification = function(date) {
    return Math.round(moment.duration(moment(this.time).tz(this.timeZone).utc().diff(moment(date).utc())).asMinutes()) === this.notificaiton;
};

AppointmentSchema.statics.sendNotifications = function(callback) {
    // now
    const searchDate = new Date();
    Appointment
        .find()
        .then(function(appointments) {
            appointments = appointments.filter(function(appointment) {
                return appointment.requiresNotification(searchDate);
            });
            if (appointments.length > 0) {
                sendNotifications(appointments);
            };
        });
    
    /**
    * Send messages to all appoinment owners via Twilio
    * @param {array} appointments List of appointments.
    */
   function sendNotifications(appointments) {
       const client = new Twilio(cfg.twilioAccountSid, cfg.twilioAuthToken);
       appointments.forEach(function(appointment) {
           const options = {
               to: `+ ${appointment.phoneNumber}`,
               from: cfg.twilioPhoneNumber,
                /* eslint-disable max-len */
                body: `Hi ${appointments.name}! Just a friendly reminder that you have an appointment coming up!`
                /* eslint-enable max-len */
            };
            // send the message! 
            client.messages.create(options, function(err, response) {
                if (err) {
                    // log error 
                    console.log(err)
                } else {
                    // log the last few digits of the phone number
                    let masked = appointment.phoneNumber.substr(0, 
                        appointment.phoneNumber.length -5);
                        masked += '*****';
                        console.log(`Message sent to ${masked}`);
                }
            });
       });

    //    Dont' wait on success/failure, just indicate all messages have been queued for delivery 
    if (callback) {
        callback.call();
    }
   }
};

const Appointment = mongoose.model('appointment', AppointmentSchema);
module.exports = Appointment;
