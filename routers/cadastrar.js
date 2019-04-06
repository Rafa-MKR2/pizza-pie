const database =  require('../config/firebase-dao')();
const fs = require('fs')

module.exports = app =>{
    app.get('/cadastrar', (req, res)=>{

        res.writeHead(200,{'Content-Type': 'text/html'})
        fs.readFile('./app/cadastra.html',null,function(error,data){
          if(error) {
              console.log(error)

           return res.writeHead(404)
            

          }else{
            res.write(data);
        } 
        res.end();
 
        })
      
    })
}