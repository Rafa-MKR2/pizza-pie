import { ApiFirebase } from "./ApiFirebase.js";
import { DateHelper } from "../helpers/DateHelper.js";
import { Pedido } from "./Carrinho.js";

export const TAXA_SERVICO = 0.10;

export class Servico{

  private _id: string;
  private _hora:Date;
  private _pedidos: Pedido[];
  private _status: string = 'pendente';

    constructor(ordem:ApiFirebase){

    this._id = ordem.id
    this._hora = new Date(ordem.hora)
    this._pedidos = ordem.pedidos;
    this._status = ordem.status || 'pendente';

  }

  get subtotal():number{
    return this._pedidos.reduce((acc, item) => acc + (item.quantidade * item.preco), 0);
  }

  get taxa():number{
    return this.subtotal * TAXA_SERVICO;
  }

  get total():number{
     return this.subtotal + this.taxa;
  }

  get id(){
    return this._id;
  }

  get status():string{
    return this._status;
  }

  get hora():string{
        return DateHelper.horaFormatada(this._hora, true)
    }

  get pedidos(): Pedido[]{

   let lista:Pedido[] =[];

   // joga todos itens dentro de um lista
    for(var i in this._pedidos) {
      lista.push({
            id: this._pedidos[i].id,
            nome: this._pedidos[i].nome,
            quantidade: this._pedidos[i].quantidade,
            preco: this._pedidos[i].preco
      }) 
    }
    return lista;

}


}
