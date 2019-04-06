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

        let pedido:Pedido ={
            id: item.id, 
            nome: item.nome,
            quantidade: item.quantidade,
            preco: item.preco
            }

        !this._lista ?  this._lista.push(pedido) : this._lista;

        const existente :boolean = this._lista.some(itens => itens.id === item.id)

        // se existir item já adicionado incrementa apenas quantidadeidade
        existente ?
            this._lista.forEach(lista => 
                item.id===lista.id ? lista.quantidade=item.quantidade : lista) 
                : this._lista.push(pedido)

       return  this.atualizaLista();
      
    }


    atualizaLista(): Pedido[]{

    let novaLista:Pedido[] = []; 
    
    this._lista.forEach(item=>
        item.quantidade >0 ?  novaLista.push(item) : item )
       
        return this._lista = novaLista;
    }


    lista(): Pedido[] {
        return [].concat(this._lista)
     }


    resetaLista(){
       return this._lista.length = 0;
     }  



}