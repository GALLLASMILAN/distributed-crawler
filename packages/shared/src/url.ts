export function normalizeUrl(url: string) {
  return Buffer.from(url).toString('base64url');
}