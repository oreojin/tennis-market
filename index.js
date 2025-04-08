import { route } from './router.js';
import { start } from './server.js';
import handle from './requestHandler.js';
import mariadb from './database/connect/mariadb.js';

mariadb.connect();

start(route, handle);
