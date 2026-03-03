import axios from 'axios';
import * as cheerio from 'cheerio';
import robotsParser from 'robots-parser';

// TODO: use it in the next iteration
// TODO: cache result in the db => `Robots` entity!
async function getRobots(url: URL) {
  const key = url.origin;
  const robotsUrl = `${key}/robots.txt`;
  try {
    const res = await axios.get(robotsUrl);
    const parsed = robotsParser(robotsUrl, res.data);
    return parsed;
  } catch {
    return null;
  }
}

export async function crawlPage(url: string): Promise<string[]> {
  const parsedUrl = new URL(url);

  const res = await axios.get(url);
  const $ = cheerio.load(res.data);

  const links: string[] = [];

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (!href) return;

    try {
      const absolute = new URL(href, parsedUrl.origin).toString();
      links.push(absolute);
    } catch { }
  });

  return links;
}