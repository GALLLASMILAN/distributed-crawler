import 'reflect-metadata';
import { initORM } from '@crawler/database';
import { crawlQueue } from '@crawler/queue';
import { Url } from '@crawler/database';
import { normalizeUrl } from '@crawler/shared';

const SEED = process.env.SEED ?? 'https://ipfabric.io/';

async function main() {
  const orm = await initORM();
  const em = orm.em.fork();

  const exists = await em.findOne(Url, { url: SEED });

  if (!exists) {
    const url = em.create(Url, { url: SEED });
    em.persist(url);
    await em.flush();
    console.debug(`initial entity ${JSON.stringify(url)} saved`);

    await crawlQueue.add(
      'crawl',
      { url: SEED },
      { jobId: normalizeUrl(SEED) }
    );

    console.debug('Seeded.');
  }

  // TODO: load pending records from db and add them to queue, in cese the queue is empty

  console.debug('Scheduler done');
}

main();