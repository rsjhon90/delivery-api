import { Router } from 'express';
import pedidosController from '../controller/pedidos.controller.js';
import { logger, logRequests } from '../logger.js';

const router = Router();

router.use(logRequests);

router.post('/', pedidosController.createPedido);
router.put('/update/:id', pedidosController.updatePedido);
router.patch('/update/:id', pedidosController.updateEntrega);

router.use((err, request, response, next) => {
  const { method, url } = request;

  logger.error(`[${method.toUpperCase()}] url:${url} - ${err.message}`)
  response.status(400).json({ error: err.message })
})

export default router;