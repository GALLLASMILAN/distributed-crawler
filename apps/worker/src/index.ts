import 'reflect-metadata';
import { initORM } from '@crawler/database';
import { createWorker, crawlQueue } from '@crawler/queue';
import { crawlPage } from '@crawler/crawler-core';
import { Url } from '@crawler/database';
import { normalizeUrl } from '@crawler/shared';

async function start() {
  const orm = await initORM();

  const worker = createWorker(async job => {
    const { url } = job.data;

    const em = orm.em.fork();
    const entity = await em.findOne(Url, { url });

    if (!entity || entity.status !== 'pending') return;

    entity.status = 'processing';
    await em.flush();

    try {
      const result = await crawlPage(url);
      entity.status = 'done';
      await em.flush();

      for (const link of result) {
        const existing = await em.findOne(Url, { url: link });
        if (!existing) {
          const newUrl = em.create(Url, { url: link });
          await em.persist(newUrl).flush();
          await crawlQueue.add('crawl', { url: link }, { jobId: normalizeUrl(link) });
        }
      }

    } catch {
      entity.status = 'failed';
      await em.flush();
    }
  });

  await worker.run();
}

start();