var admin = require('firebase-admin');
var serviceAccount = require('../config/serviceAccount.json');

module.exports =app=>{
    app.post('/token',function(req,res){
    
        var uid = req.body.uid;
        console.log(uid)
        
 if(!uid) {
    console.log("uid deve ser preenchido!")
     return
    }
        const premiumContent = {  premiumAccount: true }   
        
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://portifolio-rafa.firebaseio.com"
        
        })

        admin.auth().createCustomToken(uid,premiumContent).then((token)=>{    
            res.send(token);
        }).catch((err)=>{
            console.log(err)
        })
       

    
    })
}