System.register(["../models/Servico.js"], function (exports_1, context_1) {
    "use strict";
    var Servico_js_1, PizzaPieService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Servico_js_1_1) {
                Servico_js_1 = Servico_js_1_1;
            }
        ],
        execute: function () {
            PizzaPieService = class PizzaPieService {
                enviarOrdemDeServico(content) {
                    return fetch('/pedidos/cadastra-pedido', {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(content)
                    });
                }
                obterServico(handler) {
                    return fetch('/pedidos')
                        .then(res => handler(res))
                        .then(res => res.json())
                        .then((ordem) => ordem.map(servico => new Servico_js_1.Servico(servico)));
                }
                removerOrdem(id) {
                    let key = { key: id };
                    return fetch('/pedidos/remove-pedido', {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(key)
                    });
                }
            };
            exports_1("PizzaPieService", PizzaPieService);
        }
    };
});
