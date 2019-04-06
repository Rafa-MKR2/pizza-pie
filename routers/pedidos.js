const database =  require('../config/firebase-dao')();

module.exports = app =>{
    app.get('/pedidos', (request, response)=>{


        var firebase = new database;    
            firebase.lista().then(pedidos => 
                response.status(200).json(pedidos.reverse())
                ).catch(err=>  response.status(200).json(err));  
      
           
    })

    app.post('/pedidos/cadastra-pedido', function(request,response){

        var pedido = request.body;
        request.assert("hora","horario do pedido deve ser fornecido")
        .notEmpty();
        request.assert("pedidos", "forneça os pedidos corretamente dentro do formato")
        .isArray().notEmpty()

        const errors = request.validationErrors();
        if (errors) {
            console.log(errors)
          return response.status(400).json(errors);
        }
        var firebase = new database;    
            firebase.cadastrar(pedido);

        response.end()
      
    })

    app.post('/pedidos/remove-pedido', function(request,response){

        var id = request.body;
        request.assert("key","você deve fornecer o id no formato string")
        .notEmpty()
        
        const errors = request.validationErrors();
        if (errors) {
            console.log(errors)
          return response.status(400).json(errors);
        }
        var firebase = new database;    
            firebase.remove(id.key);
            response.end()
      
    })
}