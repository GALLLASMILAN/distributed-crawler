import { Job, Queue, Worker } from 'bullmq';
import { QUEUE_WORKER_CONCURRENCY, REDIS_HOST, REDIS_PORT } from './constants';

const connection = {
  host: REDIS_HOST,
  port: REDIS_PORT
};

export const crawlQueue = new Queue('crawl', {
  connection,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
    // error retry
    attempts: Number(process.env.QUEUE_RETRY_ATTEPMS ?? 10),
    backoff: {
      type: 'exponential',
      delay: 100_000, // 100s
    },
  }
});

export function createWorker(processor: (job: Job) => Promise<void>) {
  const worker = new Worker('crawl', processor, { connection, autorun: false, concurrency: QUEUE_WORKER_CONCURRENCY });

  worker.on('ready', () => {
    console.log('Worker ready');
  });

  worker.on('completed', job => {
    console.log('Completed:', job.id);
  });

  worker.on('failed', (job, err) => {
    console.error('Failed:', err);
  });

  return worker;
}