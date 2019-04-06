import { ApiFirebase } from "../models/ApiFirebase.js";
import { Servico } from "../models/Servico.js";

export interface HadlerResponse{
    (res: Response): Response;
}
export class PizzaPieService{




    enviarOrdemDeServico(content:ApiFirebase){

      return  fetch('/pedidos/cadastra-pedido',{
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify(content)
            })
           
    }



    obterServico(handler: HadlerResponse): Promise<Servico[]>{

        return  fetch('/pedidos')
            .then(res=> handler(res))
            .then(res=> res.json())
            .then((ordem: ApiFirebase[])=> 
               ordem.map(servico=> new Servico(servico))
                 )
    }



    removerOrdem(id:string){
        let key ={key:id}
      return  fetch('/pedidos/remove-pedido',{
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify(key)
            })
    }
    
}