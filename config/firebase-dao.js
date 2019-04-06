// Conecta ao banco de dados do Firebase
const admin = require('./../config/config-firebase')();

class database{
    constructor(){
        this._admin = admin; 
        this._db = this._admin.database().ref('/delivery');
    }


  
    lista(){
        return  new Promise((resolve,reject)=>{
            return  this._db.on("value", function(snapshot) {
                 let lista= []
                  snapshot.forEach(pedido => {

                  lista.push({id: pedido.key,
                              hora:pedido.val().hora,
                              pedidos:pedido.val().pedidos})
               })
                  resolve(lista)
                  reject([])
                  
                })
             })
      }

      cadastrar(pedido){
        return this._db.push(pedido)
      }


      remove(key){
        return this._db.ref.child(key).remove();

      }

}



module.exports = function() {
    return database;
};