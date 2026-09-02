/**
 * Statuses for the live demo links.
 */
export const DEMO_STATUS = {
  CHECKING: 'checking',
  ONLINE: 'online',
  OFFLINE: 'offline',
};

const CACHE_KEY = 'portfolio-demo-status';
const CACHE_TTL_MS = 5 * 60 * 1000;
const PROBE_TIMEOUT_MS = 7000;

const isBrowser = typeof window !== 'undefined';

function readCache() {
  if (!isBrowser) return {};

  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeCache(cache) {
  if (!isBrowser) return;

  try {
    window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Ignore errors
  }
}

export function readCachedStatuses(urls) {
  const cache = readCache();
  const now = Date.now();

  return urls.reduce((acc, url) => {
    const entry = cache[url];
    if (entry && now - entry.at < CACHE_TTL_MS) acc[url] = entry.status;
    return acc;
  }, {});
}

export function cacheStatus(url, status) {
  const cache = readCache();
  cache[url] = { status, at: Date.now() };
  writeCache(cache);
}

export async function probeDemoUrl(url) {
  if (!isBrowser) return DEMO_STATUS.CHECKING;

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);

  try {
    await fetch(url, {
      mode: 'no-cors',
      cache: 'no-store',
      redirect: 'follow',
      credentials: 'omit',
      signal: controller.signal,
    });
    return DEMO_STATUS.ONLINE;
  } catch {
    return DEMO_STATUS.OFFLINE;
  } finally {
    window.clearTimeout(timer);
  }
}
