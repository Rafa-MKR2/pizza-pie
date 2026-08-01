import { Carrinho } from './models/Carrinho.js';
import { PizzaPieService } from './service/PizzaPieService.js';
import { Mensagem } from './models/Mensagem.js';
import { DateHelper } from './helpers/DateHelper.js';
export class Controllers {
    constructor() {
        this._serviceApi = new PizzaPieService();
        this._OrdemDePedidos = [];
        this._socket = io();
        this._mensagem = new Mensagem();
        this._carrinho = new Carrinho();
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
        this._socket.on('status', (data) => {
            this.listarPedidos();
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
    async listarPedidos() {
        try {
            const importaOrdemDeServico = await this._serviceApi
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
            this._mensagem.create(String(err), { duracao: 9000 });
        }
    }
    deletar(key) {
        return this._serviceApi.removerOrdem(key)
            .then(res => console.log(res))
            .then(() => this.listarPedidos())
            .then(() => this._socket.emit('exclusao', key))
            .catch(err => console.log(err));
    }
    atualizarStatus(key, status) {
        return this._serviceApi.atualizarStatus(key, status)
            .then(() => this.listarPedidos())
            .then(() => this._socket.emit('status', { key, status }))
            .catch(err => console.log(err));
    }
    carregarCardapio() {
        return this._serviceApi.obterCardapio();
    }
    _update(services) {
        this._OrdemDePedidos = services.slice();
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
        <h6><span class="chip status-chip status-${service.status}">${service.status.replace('_', ' ')}</span></h6>
        </div>
        <div class="card-content">
        <ul class="collection">
    ${service.pedidos.map(item => {
                return `<li class="collection-item">
        ${item.nome} <span class="badge" style="margin-top:5px;">${item.quantidade} X 
        <span style="color:green;">${DateHelper.real(item.preco)}</span></span>
        </li> `;
            }).join('')}
       </ul>
       <a class="right" style="color:green;" href="#">Subtotal: ${DateHelper.real(service.subtotal)}</a>
       <a class="right" style="color:brown;" href="#">Taxa 10%: ${DateHelper.real(service.taxa)}</a>
       <a class="right" style="color:green;" href="#">Total: ${DateHelper.real(service.total)}</a>
       <a  href="#">${service.hora}</a>
       <div class="input-field">
          <select class="status-select" data-id="${service.id}">
            <option value="pendente" ${service.status === 'pendente' ? 'selected' : ''}>Pendente</option>
            <option value="em_preparo" ${service.status === 'em_preparo' ? 'selected' : ''}>Em preparo</option>
            <option value="pronto" ${service.status === 'pronto' ? 'selected' : ''}>Pronto</option>
            <option value="entregue" ${service.status === 'entregue' ? 'selected' : ''}>Entregue</option>
          </select>
          <label>Status do pedido</label>
       </div>
        </div>
      </div>
    </div>
    </div>`);
        });
        $('.status-select').formSelect();
        $('.status-select').on('change', function () {
            const id = $(this).attr('data-id');
            const status = $(this).val();
            if (id)
                this.atualizarStatus(id, status);
        }.bind(this));
        const contextoDeController = (id) => this.deletar(id);
        $('.delete').click(function () {
            const modal = document.querySelector('.modalDelete');
            if (modal) {
                const instance = M.Modal.getInstance(modal);
                instance.open();
            }
            const id = $(this).attr('id');
            if (id)
                return contextoDeController(id);
        });
    }
    playNotification(Mensagem, tempo) {
        let audio = new Audio("sfx/Tapping.mp3");
        return window.navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => {
            audio.play().then(() => {
                this._mensagem.create(Mensagem, { duracao: tempo });
            }).catch(() => this._mensagem.create('Ops! Erro ao tentar reproduzir audio', { duracao: 10000 }));
        }).catch(() => this._mensagem.create('Audio do seu navegador estar desativado!', { duracao: 10000 }));
    }
}
