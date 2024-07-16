import packageJson from '../../../package.json';
import { DeepReadonly } from './types';

export const PACKAGE_JSON = 'PACKAGE_JSON';
export type PackageJson = DeepReadonly<typeof packageJson>;

export { packageJson };
