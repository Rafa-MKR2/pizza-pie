System.register(["./Controller.js"], function (exports_1, context_1) {
    "use strict";
    var Controller_js_1, controller;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Controller_js_1_1) {
                Controller_js_1 = Controller_js_1_1;
            }
        ],
        execute: function () {
            controller = new Controller_js_1.Controllers();
            $(document).ready(function () {
                $('.fixed-action-btn').floatingActionButton();
                $('.tabs').tabs();
                $('.modal').modal();
                $('select').formSelect();
                $('.sidenav').sidenav();
                $(".item-pedido").click(function () {
                    let val = $(this).children(".quant").text();
                    let quant = val == '' ? 0 : parseInt(val);
                    $(this).addClass("orange");
                    $(this).children(".quant").addClass('white');
                    $(this).children(".quant").css({ color: "brown" });
                    $(this).children(".remove").css({ color: "white" });
                    $(this).children(".remove").html(`<i style="color:white;" class="material-icons  remove">backspace</i>`);
                    $(this).children(".quant").text(quant + 1);
                    $(this).children(".remove").click(function () {
                        $(this).children(".quant").text(-1);
                    }.bind(this));
                    if (quant <= -1) {
                        $(this).removeClass("orange");
                        $(this).children(".quant").removeClass('white');
                        $(this).children(".quant").css({ color: "white" });
                        $(this).children(".remove").css({ color: "white" });
                        $(this).children(".remove").html(``);
                    }
                    let pedido = {
                        id: $(this).attr('id'),
                        nome: $(this).text().substr(0, ($(this).text().length - 1)),
                        quantidade: quant + 1,
                        preco: 40
                    };
                    return controller.adicionarPedido(pedido);
                });
                $(".quant").click(function () {
                    let val = $(this).text();
                    let num = !val ? 0 : parseInt(val);
                    $(this).text(num - 2);
                    if (num <= 0 || val == '' || num < 0)
                        $(this).text(0);
                });
                $("#check").click(function () {
                    $('#list').html('');
                    let total = 0.0;
                    controller.pedidosNoCarrinho.forEach(itens => {
                        total = total + (itens.quantidade * itens.preco);
                        $('#list').append(`
            <blockquote class="blockquoteColor indigo lighten-5">
            ${itens.nome}
            <span class="right" style="font-size:13px;">
            ${itens.quantidade} x R$ ${itens.preco}.00
            </span>
            </blockquote>`);
                    });
                    $('#total').html(`TOTAL : R$ ${total}.00`);
                });
                $('#pedir').click(function () {
                    if (controller.pedidosNoCarrinho.length === 0)
                        M.toast({ html: `<span>Não há itens selecionados</span>` });
                    else {
                        controller.enviarPedidos({
                            hora: new Date().getTime(),
                            pedidos: controller.pedidosNoCarrinho
                        });
                        M.toast({ html: `<span>Pedido relizado com sucesso!</span>` });
                        $(".item-pedido").removeClass("orange");
                        $(".item-pedido").children(".quant").removeClass('white');
                        $(".item-pedido").children(".quant").css({ color: "white" });
                        $(".item-pedido").children(".quant").text(0);
                    }
                });
            });
        }
    };
});
