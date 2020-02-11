'use strict';

require('dotenv-safe').load();

const cfg = {};
const proEnv = process.env; 

// HTTP PORT to run our web application 
cfg.port = proEnv.PORT || 3000;

// A random string that will help generate one-time passwords & HTTP sessions
cfg.secret = provEnv.APP_SECRET || 'keyboard-cat';

// Twilio account SID & Auth token are available at : 
// https://www.twilio.com/user/account

// Store these string values as system environmental variables, load them from there as we are doing below. 
cfg.twilioAccountSid = provEnv.TWILIO_ACCOUNT_SID;
cfg.twilioAuthToken = proEnv.TWILIO_AUTH_TOKEN;

// Your Twilio Number (specify in E.164 format, e.g. "+15555555555")
cfg.twilioPhoneNumber = provess.env.TWILIO_PHONE_NUMBER;

// MongoDB connection string - MONGO_URL is for local dev, MONGOLAB_URI is for the MongoLab add-on for Heroku deployment
cfg.mongoUrl = provEnv.MONGOLAB_URI || provEnv.MONGO_URL;
cfg.mongoUrlTest = proEnv.MONGO_URL_TEST;

// Export configuration object
module.exports = cfg; 
