import { DateHelper } from "../helpers/DateHelper.js";
export class Servico {
    constructor(ordem) {
        this._total = 0;
        this._id = ordem.id;
        this._hora = new Date(ordem.hora);
        this._pedidos = ordem.pedidos;
        this.pedidos.forEach(item => this._total = this._total + (item.quantidade * item.preco));
    }
    get total() {
        return this._total;
    }
    get id() {
        return this._id;
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
