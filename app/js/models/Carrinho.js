System.register([], function (exports_1, context_1) {
    "use strict";
    var Carrinho;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Carrinho = class Carrinho {
                constructor() {
                    this._lista = [];
                }
                add(item) {
                    let pedido = {
                        id: item.id,
                        nome: item.nome,
                        quantidade: item.quantidade,
                        preco: item.preco
                    };
                    !this._lista ? this._lista.push(pedido) : this._lista;
                    const existente = this._lista.some(itens => itens.id === item.id);
                    existente ?
                        this._lista.forEach(lista => item.id === lista.id ? lista.quantidade = item.quantidade : lista)
                        : this._lista.push(pedido);
                    return this.atualizaLista();
                }
                atualizaLista() {
                    let novaLista = [];
                    this._lista.forEach(item => item.quantidade > 0 ? novaLista.push(item) : item);
                    return this._lista = novaLista;
                }
                lista() {
                    return [].concat(this._lista);
                }
                resetaLista() {
                    return this._lista.length = 0;
                }
            };
            exports_1("Carrinho", Carrinho);
        }
    };
});
