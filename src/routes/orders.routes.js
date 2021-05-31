import { Router } from 'express';
import ordersController from '../controller/orders.controller.js';
import { logger, logRequests } from '../logger.js';

const router = Router();

router.use(logRequests);

router.post('/', ordersController.createOrder);
router.put('/update/:id', ordersController.updateOrder);

router.use((err, request, response, next) => {
  const { method, url } = request;

  logger.error(`[${method.toUpperCase()}] url:${url} - ${err.message}`)
  response.status(400).json({ error: err.message })
})

export default router;