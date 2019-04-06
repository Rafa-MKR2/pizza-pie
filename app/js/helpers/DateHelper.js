System.register([], function (exports_1, context_1) {
    "use strict";
    var DateHelper;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DateHelper = class DateHelper {
                constructor() {
                    throw new Error("DateHelper, não pode ser instanciada");
                }
                static dataParaTexto(data) {
                    return `${data.getDate() < 9 ? '0' + data.getDate() : data.getDate()}/${(data.getMonth() + 1) < 9 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1)}/${data.getFullYear()}`;
                }
                static textoParaData(texto) {
                    if (!/\d{4}-\d{2}-\d{2}/.test(texto))
                        throw new Error("Data deve estar no formato aaaa-mm-dd");
                    return new Date(texto.replace('-', ','));
                }
                static horaFormatada(data, turno = false) {
                    let horas = data.getHours() < 9 ? '0' + data.getHours() : data.getHours(), min = data.getMinutes() < 9 ? '0' + data.getMinutes() : data.getMinutes(), ampm = horas > 12 ? 'pm' : 'am';
                    return `${horas}:${min} ${!turno ? '' : ampm}`;
                }
                static diasUteis(data = new Date()) {
                    let Semana;
                    (function (Semana) {
                        Semana[Semana["Domingo"] = 0] = "Domingo";
                        Semana[Semana["Segunda"] = 1] = "Segunda";
                        Semana[Semana["Terca"] = 2] = "Terca";
                        Semana[Semana["Quarta"] = 3] = "Quarta";
                        Semana[Semana["Quinta"] = 4] = "Quinta";
                        Semana[Semana["Sexta"] = 5] = "Sexta";
                        Semana[Semana["Sabado"] = 6] = "Sabado";
                    })(Semana || (Semana = {}));
                    return data.getDay() != Semana.Sabado &&
                        data.getDay() != Semana.Domingo ?
                        'Você não pode fazer pedidos nos finais de semana!'
                        : 'Pedido realizado com sucesso!';
                }
            };
            exports_1("DateHelper", DateHelper);
        }
    };
});
