import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;
const dataPath = './src/data/pedidos.json';

async function getPedidos() {
  const data = JSON.parse(await readFile(dataPath));

  return data;
};

async function insertPedido(data) {
  await writeFile(
    dataPath, JSON.stringify(data, null, 2))
};

async function deletePedito(index) {
  const data = await getPedidos();

  data.pedidos.splice(index, 1)

  await writeFile(
    dataPath, JSON.stringify(data, null, 2))
};

export default {
  getPedidos,
  insertPedido,
  deletePedito
};