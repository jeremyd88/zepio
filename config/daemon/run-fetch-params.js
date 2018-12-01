// @flow
import cp from 'child_process';
import path from 'path';

import getBinariesPath from './get-binaries-path';
import log from './logger';

export default (): Promise<*> => new Promise((resolve, reject) => {
  log('Fetching params');
  const processName = path.join(getBinariesPath(), 'zcash-fetch-params');

  const childProcess = cp.spawn(processName);

  childProcess.stdout.on('data', data => log(data.toString()));
  childProcess.stderr.on('data', data => log(data.toString()));
  childProcess.on('error', reject);
  childProcess.on('exit', (code, err) => {
    if (code !== 0 || err) {
      reject(new Error(err));
    }
    resolve();
  });
});
