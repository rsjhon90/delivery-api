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
};

async function deletePedito(id) {
  const index = data.pedidos.findIndex(pedido => pedido.id === parseInt(id));

  if (index < 0) {
    throw new Error('Pedido não encontrado!')
  }

  await pedidosRepositories.deletePedito(index);
}

async function getPedido(id) {
  const pedido = data.pedidos.find(pedido => pedido.id === parseInt(id));

  if (!pedido) {
    throw new Error('Pedido não encontrado!')
  }

  return pedido;
};

async function getCliente(requestCliente) {
  const { pedidos } = data;

  const pedido = pedidos.find(
    (pedido) => pedido.cliente === requestCliente);

  if(!pedido) {
    throw new Error('Cliente não encontrado')
  };

  const gastoTotal = pedidos.filter(
    (pedido) => pedido.entregue == true && pedido.cliente == requestCliente)
    .map(pedido => pedido.valor)
    .reduce((valorAcumulado, valorAtual) => {
    return valorAcumulado + valorAtual;
    }, 0);

  const filteredCliente = `${pedido.cliente} gastou um total de $ ${gastoTotal}`;  

  return filteredCliente;
}

export default {
  createPedido,
  updatePedido,
  updateEntrega,
  deletePedito,
  getPedido,
  getCliente
}