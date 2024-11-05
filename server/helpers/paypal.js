const paypal = require("paypal-rest-sdk");   

paypal.configure({  //  changes - paypal solution  here, fill data
  mode: "",
  client_id: "",
  client_secret: "",
});

module.exports = paypal;
