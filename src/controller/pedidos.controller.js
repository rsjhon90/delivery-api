import pedidosService from '../services/pedidos.service.js';

async function createPedido(request, response, next) {
  try {
    const { cliente, produto, valor } = request.body;

    if (cliente == null || produto == null|| valor == null) {
      throw new Error('Campos cliente, produto e valor são orbigatórios')
    }

    const pedidoRequest = {
      cliente, 
      produto, 
      valor
    }

    const pedido = await pedidosService.createPedido(pedidoRequest);

    return response.json(pedido);
  } catch (err) {
    next(err);
  };
};

async function updatePedido(request, response, next) {
  try {
    const { id } = request.params;
    const { cliente, produto, valor, entregue } = request.body;

    if (cliente == null 
      || produto == null
      || valor == null
      || entregue == null) {
      throw new Error('Campos cliente, produto e valor são orbigatórios')
    }

    const pedidoRequest = {
      id,
      cliente, 
      produto, 
      valor, 
      entregue
    }

    await pedidosService.updatePedido(pedidoRequest);

    return response.json(pedidoRequest);

  } catch (err) {
    next(err)
  };
};

async function updateEntrega(request, response, next) {
  try {
    const { id } = request.params;
    const { entregue } = request.body;

    const pedidoRequest = {
      id,
      entregue
    }

    const { cliente, 
      produto, 
      valor, 
      entregue: entrega 
    } = await pedidosService.updateEntrega(pedidoRequest);

    return response.json({cliente, produto, valor, entrega});

  } catch (err) {
    next(err)
  };
}

async function deletePedito(request, response, next) {
  try {
    const { id } = request.params;

    await pedidosService.deletePedito(id);

    return response.json({ message: 'Pedido deletado com sucesso' })
  } catch (err) {
    next(err)
  }
};

async function getPedido(request, response, next) {
  try {
    const { id } = request.params;

    const pedido = await pedidosService.getPedido(id);

    return response.json(pedido);
  } catch (err) {
    next(err)
  };
};

async function getCliente(request, response, next) {
  try {
    const { cliente } = request.body;

    if(cliente == null) {
      throw new Error('Campo cliente é obrigatório')
    } else if (cliente == Number) {
      throw new Error('Formato de dados incorretos')
    };

    const resultCliente = await pedidosService.getCliente(cliente);

    return response.json(resultCliente);
  } catch (err) {
    next(err)
  };
};

export default {
  createPedido,
  updatePedido,
  updateEntrega,
  deletePedito,
  getPedido,
  getCliente
};