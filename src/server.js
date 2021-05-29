import express from 'express';
import logger from './logger.js';

const app = express();

app.listen(3000, () => {
  logger.info('🌠 Api Started on port 3000')
});