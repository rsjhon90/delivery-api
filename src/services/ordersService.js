import ordersRepositories from '../repositories/ordersRepositories.js';
import ordersController from '../controller/orders.controller.js';

async function createOrder(orderRequest) {
  const data = await ordersRepositories.getOrders();
  const { cliente, produto, valor } = orderRequest;
  const timestamp = (new Date()).toJSON();

  const order = {
    id: data.nextId++,
    cliente, 
    produto, 
    valor,
    entregue: false,
    timestamp 
  }

  data.pedidos.push(order);

  await ordersRepositories.insertOrder(data);

  return order;
};

async function updateOrder() {

}

export default {
  createOrder,
  updateOrder
}