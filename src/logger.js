import winston from 'winston';

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
})

export const logger = winston.createLogger({
  level: "silly",
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: './src/logs/delivery-api.log' })
  ],
  format: combine(
    label({ label: "delivery-api"}),
    timestamp(),
    myFormat
  )
});

export function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] url:${url}`;

  logger.info(logLabel);

  next();
}