 export interface Pedido {
   id: string;
   nome: string;
   quantidade: number;
   preco: number;
  }
  


export class Carrinho {
    
    private _lista: Pedido[];

    constructor(){
        this._lista = []
     }

    add(item:Pedido): Pedido[]{

        const existente :boolean = this._lista.some(itens => itens.id === item.id)

        // se existir item já adicionado incrementa apenas quantidade
        if (existente) {
            this._lista.forEach(lista => {
                if (item.id === lista.id) lista.quantidade = item.quantidade;
            });
        } else {
            this._lista.push(item);
        }

       return  this.atualizaLista();
      
    }


    atualizaLista(): Pedido[]{

    let novaLista:Pedido[] = []; 
    
    this._lista.forEach(item=>
        item.quantidade >0 ?  novaLista.push(item) : item )
       
        return this._lista = novaLista;
    }


    lista(): Pedido[] {
        return this._lista.slice();
     }


    resetaLista(){
       return this._lista.length = 0;
     }  



}