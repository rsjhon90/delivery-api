import ordersService from '../services/ordersService.js';
import ordersRepositories from '../repositories/ordersRepositories.js';

async function createOrder(request, response, next) {
  try {
    const { cliente, produto, valor } = request.body;

    if (cliente === null || produto === null|| valor === null) {
      throw new Error('Campos cliente, produto e valor são orbigatórios')
    }

    const orderRequest = {
      cliente, 
      produto, 
      valor
    }

    const order = await ordersService.createOrder(orderRequest);

    return response.json(order);
  } catch (err) {
    next(err);
  };
};

async function updateOrder(request, response, next) {
  try {
    const { id } = request.params;
    const { cliente, produto, valor, entregue } = request.body;

    if (cliente === null 
      || produto === null
      || valor === null
      || entregue === null) {
      throw new Error('Campos cliente, produto e valor são orbigatórios')
    }

    const orderRequest = {
      id,
      cliente, 
      produto, 
      valor, 
      entregue
    }

    const order = await ordersService.updateOrder(orderRequest);

    return response.json(order);

  } catch (err) {
    next(err)
  };
};

export default {
  createOrder,
  updateOrder
};