import { Pedido } from "./Carrinho";

 export interface ApiFirebase{
    id?: string,
    hora: number,
    pedidos:Pedido[]
}