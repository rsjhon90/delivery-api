import pedidosService from '../services/pedidos.service.js';

async function createPedido(request, response, next) {
  try {
    const { cliente, produto, valor } = request.body;

    if (cliente === null || produto === null|| valor === null) {
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

    if (cliente === null 
      || produto === null
      || valor === null
      || entregue === null) {
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

export default {
  createPedido,
  updatePedido,
  updateEntrega
};