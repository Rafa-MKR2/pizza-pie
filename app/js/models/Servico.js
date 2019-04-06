System.register(["../helpers/DateHelper.js"], function (exports_1, context_1) {
    "use strict";
    var DateHelper_js_1, Servico;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (DateHelper_js_1_1) {
                DateHelper_js_1 = DateHelper_js_1_1;
            }
        ],
        execute: function () {
            Servico = class Servico {
                constructor(ordem) {
                    this._id = ordem.id;
                    this._hora = new Date(ordem.hora);
                    this._pedidos = ordem.pedidos;
                }
                get id() {
                    return this._id;
                }
                get hora() {
                    return DateHelper_js_1.DateHelper.horaFormatada(this._hora, true);
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
            };
            exports_1("Servico", Servico);
        }
    };
});
