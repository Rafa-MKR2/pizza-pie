export class Carrinho {
    constructor() {
        this._lista = [];
    }
    add(item) {
        const existente = this._lista.some(itens => itens.id === item.id);
        if (existente) {
            this._lista.forEach(lista => {
                if (item.id === lista.id)
                    lista.quantidade = item.quantidade;
            });
        }
        else {
            this._lista.push(item);
        }
        return this.atualizaLista();
    }
    atualizaLista() {
        let novaLista = [];
        this._lista.forEach(item => item.quantidade > 0 ? novaLista.push(item) : item);
        return this._lista = novaLista;
    }
    lista() {
        return this._lista.slice();
    }
    resetaLista() {
        return this._lista.length = 0;
    }
}
