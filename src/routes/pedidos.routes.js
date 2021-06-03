import { Router } from 'express';
import pedidosController from '../controller/pedidos.controller.js';
import { logger, logRequests } from '../logger.js';

const router = Router();

router.use(logRequests);

router.post('/pedidos', pedidosController.createPedido);
router.put('/pedidos/update/:id', pedidosController.updatePedido);
router.patch('/pedidos/update/:id', pedidosController.updateEntrega);
router.delete('/pedidos/:id', pedidosController.deletePedito);
router.get('/pedidos/:id', pedidosController.getPedido);
router.get('/clientes', pedidosController.getCliente)
router.get('/produtos', pedidosController.getProdutos);
router.get('/produtos/rank', pedidosController.rankProdutos)

router.use((err, request, response, next) => {
  const { method, url } = request;

  logger.error(`[${method.toUpperCase()}] url:${url} - ${err.message}`)
  response.status(400).json({ error: err.message })
})

export default router;