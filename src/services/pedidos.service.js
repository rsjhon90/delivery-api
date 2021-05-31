import pedidosRepositories from '../repositories/pedidos.repositories.js';

const data = await pedidosRepositories.getPedidos();

async function createPedido(pedidoRequest) {
  const { cliente, produto, valor } = pedidoRequest;
  const timestamp = (new Date()).toJSON();

  const pedido = {
    id: data.nextId++,
    cliente, 
    produto, 
    valor,
    entregue: false,
    timestamp 
  }

  data.pedidos.push(pedido);

  await pedidosRepositories.insertPedido(data);

  return pedido;
};

async function updatePedido(pedidoRequest) {
  const { id,
    cliente, 
    produto, 
    valor, 
    entregue
    } = pedidoRequest;

  const index = data.pedidos.findIndex(pedido => pedido.id === parseInt(id));

  if (index < 0) {
    throw new Error('Pedido não encontrado!')
  }

  data.pedidos[index].cliente = cliente;
  data.pedidos[index].produto = produto;
  data.pedidos[index].valor = valor;
  data.pedidos[index].entregue = entregue;

  await pedidosRepositories.insertPedido(data);
};

async function updateEntrega(pedidoRequest) {
  const { id, entregue } = pedidoRequest;

  const index = data.pedidos.findIndex(pedido => pedido.id === parseInt(id));

  if (index < 0) {
    throw new Error('Pedido não encontrado!')
  }

  if (entregue === true || entregue === false) {
    data.pedidos[index].entregue = entregue;

    await pedidosRepositories.insertPedido(data);
    return data.pedidos[index];
  }

  throw new Error('Dado incorreto. Insira se entregue é true ou false');
}

export default {
  createPedido,
  updatePedido,
  updateEntrega
}