System.register([], function (exports_1, context_1) {
    "use strict";
    var Mensagem;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Mensagem = class Mensagem {
                constructor() { }
                create(mensagem, options) {
                    if (options) {
                        !options.botao ? options.botao = {} : options.botao;
                        return M.toast({
                            html: `<span>${mensagem}!</span>
                <button  onclick="M.Toast.dismissAll()" class="btn-flat toast-action">
                ${!options.botao.buttonText ? "Entendi" : options.botao.buttonText}
                </button>`,
                            displayLength: !options.duracao ? this.duracao : options.duracao,
                            inDuration: !options.transincao ? this.transincao : options.transincao,
                            completeCallback: !options.botao.callBack ? null : options.botao.callBack,
                            classes: !options.classes ? "" : options.classes
                        });
                    }
                    else {
                        return M.toast({ html: `<span>${mensagem}!</span>`, displayLength: 20000, inDuration: 1000 });
                    }
                }
            };
            exports_1("Mensagem", Mensagem);
        }
    };
});
