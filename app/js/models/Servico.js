import { DateHelper } from "../helpers/DateHelper.js";
export const TAXA_SERVICO = 0.10;
export class Servico {
    constructor(ordem) {
        this._status = 'pendente';
        this._id = ordem.id;
        this._hora = new Date(ordem.hora);
        this._pedidos = ordem.pedidos;
        this._status = ordem.status || 'pendente';
    }
    get subtotal() {
        return this._pedidos.reduce((acc, item) => acc + (item.quantidade * item.preco), 0);
    }
    get taxa() {
        return this.subtotal * TAXA_SERVICO;
    }
    get total() {
        return this.subtotal + this.taxa;
    }
    get id() {
        return this._id;
    }
    get status() {
        return this._status;
    }
    get hora() {
        return DateHelper.horaFormatada(this._hora, true);
    }
    get pedidos() {
        let lista = [];
        for (var i in this._pedidos) {
            lista.push({
                id: this._pedidos[i].id,
                nome: this._pedidos[i].nome,
                quantidade: this._pedidos[i].quantidade,
                preco: this._pedidos[i].preco
            });
        }
        return lista;
    }
}
