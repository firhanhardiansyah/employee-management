import { EnvEnum } from '@enums/environment.enum';
import packageInfo from '../../package.json';

const scheme = 'http://';
const host = '-';
const port = ':1234';
const path = '/api/';

const baseUrl = scheme + host + port + path;

export const environment = {
  production: true,
  version: packageInfo.version,
  appName: 'Employee Management',
  envName: EnvEnum.LOCAL,
  apiBaseUrl: baseUrl,
};
