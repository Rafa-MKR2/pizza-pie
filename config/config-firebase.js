const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://portifolio-rafa.firebaseio.com"
  });
  



  module.exports = ()=>{
      return admin;
  }