import { middleware as cacheMiddleware, Options as CacheOptions } from 'apicache';
import { Application } from 'express';
import { getLogger } from '../core/utils/logger';
import { ApiConfig } from './config';

const logger = getLogger('API/caching');

export function setupCaching(app: Application, config: ApiConfig) {
  const options: CacheOptions = {
    appendKey: (req: any) => JSON.stringify(req.body),
    debug: true,
  };

  const middleware = cacheMiddleware(config.api.responseCaching.duration, true, options);

  app.use(middleware);

  logger.info(
    'Using response cache: ',
    JSON.stringify({ duration: config.api.responseCaching.duration, ...options }),
  );
}
