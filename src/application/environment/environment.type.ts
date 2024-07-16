export class Environment {
  NODE_ENV: 'local' | 'dev' | 'test' | 'qa' | 'prod';
  PORT: number;
  BACKEND_SERVICE_URL: string;
}
