import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;
const dataPath = './src/data/pedidos.json';

async function getOrders() {
  const data = JSON.parse(await readFile(dataPath));

  return data;
};

async function insertOrder(data) {
  await writeFile(
    dataPath, JSON.stringify(data, null, 2))
};

export default {
  getOrders,
  insertOrder
};