1) Pending tasks queue limiter
For each worker process we can generate several new events. So it is important to limit the pending tasks queue.

2) Persist redis, or seed data from database (pending records)

3) Add domain rate limiter

4) Add graceful shutdown

5) scale docker (localhost)

docker compose up --build --scale worker=3

6) implement sitemaps (robots-parser)
Pre-fetche when new domain discovered

```
const robots = await getRobots(parsedUrl);
  if (robots && !robots.isAllowed(url, '*')) {
    // TODO: 
  }
```

- 6A) create `robotsQueue`. Crawl job will be waiting for robots fetch
- 6B) Implement `Crawl-delay` for robots

7) proper process shutdown !! 

8) write helm package for the scrawler

