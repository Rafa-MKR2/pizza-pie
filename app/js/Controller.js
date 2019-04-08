System.register(["./models/Carrinho.js", "./service/PizzaPieService.js", "./models/Mensagem.js"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var Carrinho_js_1, PizzaPieService_js_1, Mensagem_js_1, Controllers;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Carrinho_js_1_1) {
                Carrinho_js_1 = Carrinho_js_1_1;
            },
            function (PizzaPieService_js_1_1) {
                PizzaPieService_js_1 = PizzaPieService_js_1_1;
            },
            function (Mensagem_js_1_1) {
                Mensagem_js_1 = Mensagem_js_1_1;
            }
        ],
        execute: function () {
            Controllers = class Controllers {
                constructor() {
                    this._serviceApi = new PizzaPieService_js_1.PizzaPieService();
                    this._socket = io.connect('http://localhost:8080');
                    this._mensagem = new Mensagem_js_1.Mensagem();
                    this._carrinho = new Carrinho_js_1.Carrinho();
                    this._socket.on('conexao', (data) => console.log(data));
                    this.listarPedidos();
                    this._socket.on('ordem', (data) => {
                        this.listarPedidos();
                        this.playNotification('Você tem um novo pedido !', 60000);
                    });
                    this._socket.on('exclusao', (data) => {
                        this.listarPedidos();
                        this.playNotification('Item deletado!', 60000);
                    });
                    this.playNotification('Audio do seu navagador foi habilitado!', 5000);
                }
                adicionarPedido(pedido) {
                    return this._carrinho.add(pedido);
                }
                get pedidosNoCarrinho() {
                    return this._carrinho.lista();
                }
                enviarPedidos(ordem) {
                    return this._serviceApi.
                        enviarOrdemDeServico(ordem)
                        .then(() => this._socket.emit('ordem', ordem))
                        .then(() => this._carrinho.resetaLista())
                        .then(() => this.listarPedidos());
                }
                listarPedidos() {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            const importaOrdemDeServico = yield this._serviceApi
                                .obterServico((res) => {
                                if (res.ok) {
                                    return res;
                                }
                                else {
                                    throw new Error("Não foi possivél obter serviços");
                                }
                            });
                            this._update(importaOrdemDeServico);
                            return importaOrdemDeServico;
                        }
                        catch (err) {
                            this._mensagem.create(err, { duracao: 9000 });
                        }
                    });
                }
                deletar(key) {
                    return this._serviceApi.removerOrdem(key)
                        .then(res => console.log(res))
                        .then(() => this.listarPedidos())
                        .then(() => this._socket.emit('exclusao', key))
                        .catch(err => console.log(err));
                }
                _update(services) {
                    this._OrdemDePedidos = [].concat(services);
                    $('#badgePedido').html(`
       ${!this._OrdemDePedidos.length ? '' :
                        ` <span class="itensBadge badge green" style="color:white;" >${this._OrdemDePedidos.length}</span>`}`);
                    $("#lista-servico").html('');
                    services.forEach(service => {
                        $("#lista-servico").append(`
       <div class="row">
    <div class="col s12 m12">
      <div class="card">
      <button id="${service.id}"  href="#deleteItemAertModal"  class="delete waves-effect waves-light  modal-trigger">
       <i class="material-icons">delete_forever</i>
     </button>
        <div class="card-image">
        <h6></h6>
        </div>
        <div class="card-content">
        <ul class="collection">
    ${service.pedidos.map(item => {
                            return `<li class="collection-item">
        ${item.nome} <span class="badge" style="margin-top:5px;">${item.quantidade} X 
        <span style="color:green;">R$${item.preco},00</span></span>
        </li> `;
                        }).join('')}
       </ul>
       <a class="right" style="color:green;" href="#">Total: R$${service.total}.00</a>
       <a  href="#">${service.hora}</a>
        </div>
      </div>
    </div>
    </div>`);
                    });
                    const contextoDeController = (id) => {
                        return $.bind(Controllers).call(this.deletar(id));
                    };
                    $('.delete').click(function () {
                        var modal = document.querySelector('.modalDelete');
                        var instance = M.Modal.getInstance(modal);
                        instance.open();
                        $('.deleteItemAertModal');
                        return contextoDeController($(this).attr('id'));
                    });
                }
                playNotification(Mensagem, tempo) {
                    let audio = new Audio("https://firebasestorage.googleapis.com/v0/b/portifolio-rafa.appspot.com/o/audio%2FTapping.mp3?alt=media&token=f1a1af1c-118c-49f0-a7d6-0e6fda678d85");
                    return window.navigator.mediaDevices.getUserMedia({ audio: true })
                        .then(() => {
                        audio.play().then(() => {
                            this._mensagem.create(Mensagem, { duracao: tempo });
                        }).catch(() => this._mensagem.create('Ops! Erro ao tentar reproduzir audio', { duracao: 10000 }));
                    }).catch(() => this._mensagem.create('Audio do seu navegador estar desativado!', { duracao: 10000 }));
                }
            };
            exports_1("Controllers", Controllers);
        }
    };
});
