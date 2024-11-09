import {
  availableParallelism,
  cpus,
  hostname,
  machine,
  platform,
  release,
  totalmem,
  type,
  userInfo,
  version,
} from 'os';
import { DeviceInfoType } from '../types/device-info.type';

export function getDeviceInfo() {
  const user = userInfo();

  const obj: DeviceInfoType = {
    username: user.username, // solid --> username
    homedir: user.homedir,
    hostname: hostname(), // solid

    release: release(),
    version: version(),

    cpuModel: cpus()[0].model, // solid
    totalmem: totalmem(), // solid

    type: type(),
    machine: machine(),
    platform: platform(), // solid
    availableParallelism: availableParallelism(), // solid
  };

  // fixed data
  // totalmem, platform, availableParallelism, username, hostname
  return obj;
}
