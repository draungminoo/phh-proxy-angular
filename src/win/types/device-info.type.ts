export type DeviceInfoType = {
  username: string;
  homedir: string;
  hostname: string;

  release: string;
  version: string;

  cpuModel: string;
  totalmem: number;

  type: string;
  machine: string;
  platform: string;
  availableParallelism: number;
};
