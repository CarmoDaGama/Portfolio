import { useEffect, useState } from 'react';
import { cacheStatus, probeDemoUrl, readCachedStatuses } from '../lib/demoStatus';

function scheduleIdle(run) {
  if (typeof window === 'undefined') return () => {};

  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(run, { timeout: 2500 });
    return () => window.cancelIdleCallback(id);
  }

  const id = window.setTimeout(run, 1200);
  return () => window.clearTimeout(id);
}

export function useDemoStatus(urls) {
  const urlKey = urls.filter(Boolean).join('|');

  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    const list = urlKey ? urlKey.split('|') : [];
    if (list.length === 0) return undefined;

    const cached = readCachedStatuses(list);
    const pending = list.filter((url) => !cached[url]);

    let cancelled = false;
    const cancelIdle = scheduleIdle(() => {

      if (Object.keys(cached).length > 0) {
        setStatuses((prev) => ({ ...prev, ...cached }));
      }

      pending.forEach(async (url) => {
        const status = await probeDemoUrl(url);
        if (cancelled) return;

        cacheStatus(url, status);
        setStatuses((prev) => ({ ...prev, [url]: status }));
      });
    });

    return () => {
      cancelled = true;
      cancelIdle();
    };
  }, [urlKey]);

  return statuses;
}
