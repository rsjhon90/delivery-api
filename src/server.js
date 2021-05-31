import express from 'express';
import { logger } from './logger.js';
import router from './routes/orders.routes.js';

const app = express();
app.use(express.json());
app.use(router);

app.listen(3000, () => {
  logger.info('🌠 Api Started on port 3000')
});