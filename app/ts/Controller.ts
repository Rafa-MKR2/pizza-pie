import { Carrinho, Pedido } from './models/Carrinho.js';
import { ApiFirebase } from './models/ApiFirebase.js';
import { PizzaPieService } from './service/PizzaPieService.js';
import { Servico } from './models/Servico.js';
import { Mensagem } from './models/Mensagem.js';


 
 export class Controllers{

   private _carrinho: Carrinho;
   private _serviceApi = new PizzaPieService();
   private _OrdemDePedidos:Servico[];
   private _socket = io.connect('http://localhost:3000');
   private _mensagem: Mensagem = new Mensagem();

    constructor(){
        this._carrinho = new Carrinho(); 
        this._socket.on('conexao',(data: any)=>console.log(data))
        this.listarPedidos()

        this._socket.on('ordem', (data: ApiFirebase)=> {
          this.listarPedidos()
          this.playNotification('Você tem um novo pedido !', 60000)
        })

        this._socket.on('exclusao', (data: ApiFirebase)=> { 
          this.listarPedidos()
          this.playNotification('Item deletado!', 60000)
        })
        // verfica se audio navegador  estar habilitado
        this.playNotification('Audio do seu navagador foi habilitado!',5000)

    }

    
  adicionarPedido(pedido: Pedido):Pedido[]{

        return this._carrinho.add(pedido);
    } 

get pedidosNoCarrinho(): Pedido[]{
        return this._carrinho.lista()
     }

    enviarPedidos(ordem: ApiFirebase){

     return this._serviceApi.
       enviarOrdemDeServico(ordem)
        .then(()=>this._socket.emit('ordem',ordem))
        .then(()=> this._carrinho.resetaLista())
        .then(()=>this.listarPedidos())
      }
   
async listarPedidos(){

        try{
          const importaOrdemDeServico = await this._serviceApi
          .obterServico((res: Response)=>{
            if(res.ok){
              return res;
            }else{
              throw new Error("Não foi possivél obter serviços")
            }
        });
        this._update(importaOrdemDeServico);
          
        return importaOrdemDeServico
       
      }catch(err){
          this._mensagem.create(err,{duracao:9000})
        }
    }


    deletar(key: string){
     return this._serviceApi.removerOrdem(key)
        .then(res=> console.log(res))
        .then(()=> this.listarPedidos())
        .then(()=>  this._socket.emit('exclusao',key))
        .catch(err=> console.log(err))

    }

   private _update(services: Servico[]){

    
       this._OrdemDePedidos = [].concat(services)
      
       //view
       $('#badgePedido').html(`
       ${!this._OrdemDePedidos.length? '' :
      ` <span class="itensBadge badge green" style="color:white;" >${this._OrdemDePedidos.length}</span>`}`)
    
       $("#lista-servico").html('')

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
    ${
      service.pedidos.map(item=>{
        return `<li class="collection-item">
        ${item.nome} <span class="badge" style="margin-top:5px;">X ${item.quantidade}</span>
        </li> `
      }).join('')
    }
       </ul>
       <a class="right" href="#">Total: R$00.00</a>
       <a  href="#">${service.hora}</a>
        </div>
      </div>
    </div>
    </div>`);
       })


       const contextoDeController =  (id:string)=>{

        
        return $.bind(Controllers).call(this.deletar(id))
       }

       $('.delete').click(function(){
        var modal = document.querySelector('.modalDelete');
        var instance = M.Modal.getInstance(modal);
        instance.open()
       
        $('.deleteItemAertModal')
        return contextoDeController($(this).attr('id'))
       })
    
   
  }





  playNotification(Mensagem: string, tempo: number){
    let audio:HTMLAudioElement =  new Audio("https://firebasestorage.googleapis.com/v0/b/portifolio-rafa.appspot.com/o/audio%2FTapping.mp3?alt=media&token=f1a1af1c-118c-49f0-a7d6-0e6fda678d85")  

    return window.navigator.mediaDevices.getUserMedia({ audio:true})
        .then(()=>{
            audio.play().then(()=>{
              this._mensagem.create(Mensagem,{duracao:tempo})

            }).catch(()=> this._mensagem.create('Ops! Erro ao tentar reproduzir audio',{duracao:10000}) )
            
          }).catch(()=> this._mensagem.create('Audio do seu navegador estar desativado!',{duracao:10000}) )
      
    }

  }

