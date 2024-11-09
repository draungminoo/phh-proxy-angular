export const PageData: Record<string, Record<string, any>> = {};

export function setPageData(page: string, data: Record<string, any>) {
  PageData[page] = data;
}

export function getPageData(page: string) {
  return PageData[page];
}

export function setPageKeyData(page: string, key: string, value: any) {
  if (!PageData[page]) PageData[page] = {};
  PageData[page][key] = value;
}

export function getPageKeyData(page: string, key: string) {
  return PageData[page]?.[key];
}
