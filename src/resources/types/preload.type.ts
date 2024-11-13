export type SetItemDataType = {
  key: string;
  data: string;
};

export type GetItemDataType = {
  key: string;
};

export type ElectronPreloadType = {
  getWindowId: () => number;

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
  loadUrl: (windowId: number, url: string) => void;
  loadProxyConfiguration: (windowId: number, token: string) => void;

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

  // get page data
  getDeviceInfo: (
    success?: (...args: any[]) => any,
    error?: (...args: any[]) => any,
  ) => void;

  // get available websites
  getAvailableWebsites: (
    windowId: number,
    success?: (...args: any[]) => any,
    error?: (...args: any[]) => any,
  ) => void;

  // app menu
  showAppMenu: (windowId: number, status: boolean) => void;

  // page data
  setPageData: (page: string, data: Record<string, any>) => void;
  getPageData: (page: string, success?: (...args: any[]) => any) => void;
  setPageKeyData: (
    page: string,
    key: string,
    data: Record<string, any>,
  ) => void;

  // min version validity
  checkMinVersionValidity: (windowId: number) => void;

  // open link externally
  openLinkExternally: (url: string) => void;

  // default send and receive
  send: (channel: string, data: any) => void;
  receive: (channel: string, func: (...args: any[]) => any) => void;
};
