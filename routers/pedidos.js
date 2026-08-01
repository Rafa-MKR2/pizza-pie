const PedidosDao = require('../config/pedidos-dao')();
const cardapio = require('../config/cardapio.json');

const STATUS_VALIDOS = ['pendente', 'em_preparo', 'pronto', 'entregue'];

module.exports = app => {
  app.get('/cardapio', (req, res) => {
    res.status(200).json(cardapio);
  });

  app.get('/pedidos', (req, res) => {
    new PedidosDao().lista()
      .then(pedidos => res.status(200).json(pedidos.reverse()))
      .catch(() => res.status(500).json({ erro: 'Erro ao listar pedidos' }));
  });

  app.post('/pedidos/cadastra-pedido', (req, res) => {
    const { hora, pedidos } = req.body;

    if (!hora || !Array.isArray(pedidos) || pedidos.length === 0) {
      return res.status(400).json({ erro: 'horario e pedidos são obrigatórios' });
    }

    new PedidosDao().cadastrar({ hora, pedidos })
      .then(() => res.end())
      .catch(() => res.status(500).json({ erro: 'Erro ao salvar pedido' }));
  });

  app.post('/pedidos/remove-pedido', (req, res) => {
    const { key } = req.body;

    if (!key) {
      return res.status(400).json({ erro: 'key é obrigatória' });
    }

    new PedidosDao().remove(key)
      .then(() => res.end())
      .catch(() => res.status(500).json({ erro: 'Erro ao remover pedido' }));
  });

  app.post('/pedidos/atualiza-status', (req, res) => {
    const { key, status } = req.body;

    if (!key) {
      return res.status(400).json({ erro: 'key é obrigatória' });
    }
    if (!STATUS_VALIDOS.includes(status)) {
      return res.status(400).json({ erro: `status deve ser um de: ${STATUS_VALIDOS.join(', ')}` });
    }

    new PedidosDao().atualizarStatus(key, status)
      .then(() => res.end())
      .catch(() => res.status(500).json({ erro: 'Erro ao atualizar status' }));
  });
};
