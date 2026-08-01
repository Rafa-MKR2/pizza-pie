const fs = require('fs');
const path = require('path');

const ARQUIVO = path.join(__dirname, '..', 'data', 'pedidos.json');

function carregar() {
  try {
    return JSON.parse(fs.readFileSync(ARQUIVO, 'utf8'));
  } catch (e) {
    return [];
  }
}

function salvar(pedidos) {
  if (!fs.existsSync(path.dirname(ARQUIVO))) {
    fs.mkdirSync(path.dirname(ARQUIVO), { recursive: true });
  }
  fs.writeFileSync(ARQUIVO, JSON.stringify(pedidos, null, 2));
}

class PedidosDao {
  lista() {
    return Promise.resolve(carregar());
  }

  cadastrar(pedido) {
    const pedidos = carregar();
    const novo = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      hora: pedido.hora,
      pedidos: pedido.pedidos
    };
    pedidos.push(novo);
    salvar(pedidos);
    return Promise.resolve(novo);
  }

  remove(key) {
    const pedidos = carregar().filter(p => p.id !== key);
    salvar(pedidos);
    return Promise.resolve();
  }
}

module.exports = function () {
  return PedidosDao;
};
