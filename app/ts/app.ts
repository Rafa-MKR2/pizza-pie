import { Pedido } from './models/Carrinho.js'
import { Controllers } from './Controller.js';


const controller: Controllers = new Controllers();

$(document).ready(function(){


    $('.fixed-action-btn').floatingActionButton();
    $('.tabs').tabs();
    $('.modal').modal(); 
    $('select').formSelect();
    $('.sidenav').sidenav();

   
// seleciona item e adicionar no carrinho
 $(".item-pedido").click(function(){

    let val: string = $(this).children(".quant").text();
    let quant: number = val=='' ? 0 :  parseInt(val);

    $(this).addClass("orange");
    $(this).children(".quant").addClass('white');
    $(this).children(".quant").css({color:"brown"});

    $(this).children(".remove").css({color:"white"});
    $(this).children(".remove").html(`<i style="color:white;" class="material-icons  remove">backspace</i>`);
    $(this).children(".quant").text(quant+1)

    $(this).children(".remove").click(function(){
        $(this).children(".quant").text(-1)
    }.bind(this))
   


    if(quant<=-1){
        $(this).removeClass("orange");
        $(this).children(".quant").removeClass('white')
        $(this).children(".quant").css({color:"white"});
        
        $(this).children(".remove").css({color:"white"});
        $(this).children(".remove").html(``);
    
        
    }

    let pedido: Pedido = {
            id : $(this).attr('id'),
            nome : $(this).text().substr(0,($(this).text().length - 11)),
            quantidade : quant+1,
            preco: 40
        }


    return controller.adicionarPedido(pedido);
    })


    // remove um item da lista do carrinho
    $(".quant").click(function(){

        let val: string =  $(this).text();
        let num: number = !val ? 0 : parseInt(val);
        $(this).text(num-2);
        if(num<=0 || val=='' || num<0) $(this).text(0)
    });

    // lista de itens no carrinho
    $("#check").click(function(){
        $('#list').html('')
        let total:number = 0.0; 

        controller.pedidosNoCarrinho.forEach(itens => {
           
            total = total+(itens.quantidade * itens.preco);
            $('#list').append(`
            <blockquote class="blockquoteColor indigo lighten-5">
            ${itens.nome}
            <span class="right" style="font-size:13px;">
            ${itens.quantidade} x R$ ${itens.preco}.00
            </span>
            </blockquote>`)
        });
 
        $('#total').html(`TOTAL : R$ ${total}.00`)
    });


    // confirmar pedidos selecionados
    $('#pedir').click(function(){
      
        if(controller.pedidosNoCarrinho.length===0)
                M.toast({html: `<span>Não há itens selecionados</span>`});
        else{
    
        controller.enviarPedidos({
            hora: new Date().getTime(), 
            pedidos: controller.pedidosNoCarrinho
            })
            M.toast({html: `<span>Pedido relizado com sucesso!</span>`});
                // reseta view
                $(".item-pedido").removeClass("orange");
                $(".item-pedido").children(".quant").removeClass('white')
                $(".item-pedido").children(".quant").css({color:"white"});
                $(".item-pedido").children(".quant").text(0);
 
        }
    })

   
   
})



