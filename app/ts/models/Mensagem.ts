interface OptionsMensagemCustom{
    duracao?: number,
    transincao?: number,
    classes?: string,
    botao?: { buttonText?: string, callBack?: VoidFunction}

}

export class Mensagem{

   public duracao: 1500
   public transincao: 2000
   public classes: ""
   public botao: {buttonText: "OK", callBack: null}

    constructor(){}


    create(mensagem: string, options?: OptionsMensagemCustom){

        if(options){
            !options.botao ? options.botao ={} : options.botao;
        return  M.toast({
                html: `<span>${mensagem}!</span>
                <button  onclick="M.Toast.dismissAll()" class="btn-flat toast-action">
                ${!options.botao.buttonText? "Entendi" : options.botao.buttonText}
                </button>`,
                displayLength: !options.duracao ? this.duracao : options.duracao,
                inDuration: !options.transincao ? this.transincao : options.transincao,
                completeCallback: !options.botao.callBack ? null : options.botao.callBack,
                classes: !options.classes ? "" : options.classes 
              });
        }else{
            return  M.toast({html: `<span>${mensagem}!</span>`,displayLength:20000,inDuration:1000 })
        }
    }

}