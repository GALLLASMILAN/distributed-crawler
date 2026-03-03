export const REDIS_HOST = process.env.REDIS_HOST ?? 'localhost';
export const REDIS_PORT = Number(process.env.REDIS_PORT ?? 6379);
export const QUEUE_RETRY_ATTEPMS = Number(process.env.QUEUE_RETRY_ATTEPMS ?? 10);
export const QUEUE_WORKER_CONCURRENCY = Number(process.env.QUEUE_WORKER_CONCURRENCY ?? 3);