import { Configuration } from './api/configuration';

const config = new Configuration({
    basePath: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  });

  export default config;