export class DateHelper{


    constructor(){
        throw new Error("DateHelper, não pode ser instanciada");
    }

    static dataParaTexto(data:Date): string{
        return `${data.getDate()<9 ? '0'+data.getDate(): data.getDate()
        }/${(data.getMonth()+1)< 9 ? '0'+(data.getMonth()+1): (data.getMonth()+1)
        }/${data.getFullYear()}`;

    }


    static textoParaData(texto: string):Date{

        if(!/\d{4}-\d{2}-\d{2}/.test(texto)) throw new Error("Data deve estar no formato aaaa-mm-dd");
    
        return new Date(texto.replace('-',','));
    }

    static horaFormatada(data:Date, turno: boolean=false){

        let horas = data.getHours()<9 ? '0'+data.getHours() : data.getHours() ,
            min = data.getMinutes() <9 ? '0'+data.getMinutes() : data.getMinutes(),
            ampm = horas>12 ? 'pm' : 'am';

        return `${horas}:${min} ${!turno ? '': ampm}`
    }


    static diasUteis(data:Date = new Date()): string{
        enum Semana{
            Domingo,Segunda,Terca,Quarta,Quinta, Sexta,Sabado
            } 
            return  data.getDay() != Semana.Sabado &&
                    data.getDay() != Semana.Domingo ?
             'Você não pode fazer pedidos nos finais de semana!'
              : 'Pedido realizado com sucesso!';
         
     }

}