export type SetItemDataType = {
  key: string;
  data: string;
};

export type GetItemDataType = {
  key: string;
};

export type ElectronPreloadType = {
  setItem: (
    data: SetItemDataType,
    success?: (...args: any[]) => any,
    error?: (...args: any[]) => any,
  ) => void;
  getItem: (
    key: string,
    success?: (...args: any[]) => any,
    error?: (...args: any[]) => any,
  ) => void;
  deleteItem: (
    key: string,
    success?: (...args: any[]) => any,
    error?: (...args: any[]) => any,
  ) => void;

  // load
  loadUrl: (url: string) => void;
  loadProxyConfiguration: (token: string) => void;

  // proxy token
  requestProxyToken: (
    identifierKey: string,
    success?: (...args: any[]) => any,
    error?: (...args: any[]) => any,
  ) => void;
  aboartRequestProxyToken: (
    identifierKey: string,
    success?: (...args: any[]) => any,
    error?: (...args: any[]) => any,
  ) => void;

  // get device info
  getDeviceInfo: (
    success?: (...args: any[]) => any,
    error?: (...args: any[]) => any,
  ) => void;

  // app menu
  showAppMenu: (status: boolean) => void;

  // page data
  setPageData: (page: string, data: Record<string, any>) => void;
  getPageData: (
    page: string,
    success?: (data: Record<string, any>) => any,
  ) => void;
  setPageKeyData: (
    page: string,
    key: string,
    data: Record<string, any>,
  ) => void;

  // get available websites
  getAvailableWebsites: (
    success?: (...args: any[]) => any,
    error?: (...args: any[]) => any,
  ) => void;

  // check min version validity
  checkMinVersionValidity: () => void;

  // open link externally
  openLinkExternally: (url: string) => void;

  // default send and receive
  send: (channel: string, data: any) => void;
  receive: (channel: string, func: (...args: any[]) => any) => void;
};
