import { AxiosError } from 'axios';
import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  Session,
  session,
  shell,
} from 'electron';
import { join } from 'path';
import { AppEnvTypeEnum } from './enums/app-env.enum';
import { AppEnvValues } from './env/app.env';
import { appStorage } from './tools/electron-store.tool';
import {
  getPageData,
  getPageKeyData,
  setPageData,
} from './tools/page-data.tool';
import {
  checkLocalProxyToken,
  getProxyInfoFromServer,
  requestNewProxyToken,
} from './tools/proxy.tool';

let mainWindow: BrowserWindow | null = null;
let defaultSession: Session;

export function getMainWindow() {
  return mainWindow;
}

// create new window
export function createWindow() {
  defaultSession = session.defaultSession;

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    icon: join(__dirname, '../../favicon.ico'),
    webPreferences: {
      preload:
        AppEnvValues.APP_ENV == AppEnvTypeEnum.PRODUCTION
          ? join(__dirname, '../frontend/scripts/preload/preload.prod.js')
          : join(__dirname, '../frontend/scripts/preload/preload.dev.js'),
      nodeIntegration: true,
      contextIsolation: true,
      session: defaultSession,
    },
  });

  // Set the user agent to the latest version of Chrome
  session.defaultSession.setUserAgent(AppEnvValues.USER_AGENT);
  mainWindow.webContents.setUserAgent(AppEnvValues.USER_AGENT);

  // no menu
  mainWindow.setMenu(null);

  // developer console
  if (AppEnvValues.APP_ENV == AppEnvTypeEnum.DEVELOPMENT) {
    mainWindow.webContents.openDevTools();
  }

  // Handle load errors
  mainWindow.webContents.on(
    'did-fail-load',
    (event, errorCode, errorDescription, validatedURL, isMainFrame) => {
      // Display the error dialog
      dialog.showErrorBox(
        'Load Error',
        `Failed to load ${validatedURL}\nError: ${errorDescription} (Code: ${errorCode})`,
      );

      loadErrorPage(
        'Page Loading Error',
        errorDescription,
        errorCode,
        validatedURL,
        validatedURL,
      );
    },
  );

  // web content
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (url.endsWith('?openInExternal')) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  // Listen for new windows being opened from mainWindow
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    console.log('A new window is being opened with URL:', url);

    // You can now create a new window or handle the URL accordingly
    const newWindow = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 800,
      minHeight: 600,
      icon: join(__dirname, '../../favicon.ico'),
      webPreferences: {
        preload:
          AppEnvValues.APP_ENV == AppEnvTypeEnum.PRODUCTION
            ? join(__dirname, '../frontend/scripts/preload/preload.prod.js')
            : join(__dirname, '../frontend/scripts/preload/preload.dev.js'),
        nodeIntegration: true,
        contextIsolation: true,
        session: defaultSession,
      },
    });

    // menu
    newWindow.setMenu(null);

    // developer console
    if (AppEnvValues.APP_ENV == AppEnvTypeEnum.DEVELOPMENT) {
      newWindow.webContents.openDevTools();
    }

    // load url
    newWindow.loadURL(url); // Load the URL of the new window

    return { action: 'deny' }; // This prevents the new window from being automatically opened
  });

  loadProxyConfiguration();
}

function loadProxyConfiguration() {
  // load welcome pagerenderFile(
  setPageData('welcome', { title: 'PHH Web Proxy', version: app.getVersion() });
  mainWindow?.loadURL(join(__dirname, '../frontend/apps/welcome/welcome.html'));

  setTimeout(async () => {
    // set up proxy information
    try {
      const token = await checkLocalProxyToken();
      const info = await getProxyInfoFromServer(token);

      // Set up proxy settings
      session.defaultSession
        .setProxy({
          mode: 'fixed_servers',
          proxyRules: `${info.ip}:${info.port}`,
        })
        .then(() => {
          console.log('Proxy configured successfully');
          loadHomePage();
        })
        .catch((error) => {
          dialog.showErrorBox('Error Configuring Proxy', error);
        });
    } catch (error: any) {
      if (error instanceof AxiosError) {
        const errorRes = error.response?.data;
        loadErrorPage(
          errorRes?.name ?? error.name ?? 'ERROR',
          errorRes?.message ?? error.message,
          errorRes?.status ?? error.status ?? 0,
          '-',
          '-',
        );
      } else {
        loadErrorPage(
          error.name ?? 'ERROR',
          error.message,
          error.code ?? error.status ?? 0,
          '-',
          '-',
        );
      }
    }
  }, 3000);
}

function loadTargetUrl(url: string) {
  mainWindow?.loadURL(url);
}

function loadHomePage() {
  setPageData('home', { title: 'PHH Web Proxy', version: app.getVersion() });
  mainWindow?.loadURL(join(__dirname, '../frontend/apps/home/home.html'));
}

function loadErrorPage(
  error: string,
  errorDescription: string,
  errorCode: number,
  validatedURL: string,
  reloadUrl: string,
) {
  // Optionally, you can retry loading or navigate to a fallback page
  setPageData('error', {
    title: error,
    error,
    errorDescription,
    errorCode,
    validatedURL,
    reloadUrl,
    version: app.getVersion(),
  });
  mainWindow?.loadURL(join(__dirname, '../frontend/apps/error/error.html'));
}

ipcMain.on('__set-item', (event, data) => {
  appStorage
    .setItem(data.key, data.data)
    .then(() => {
      event.sender.send(`${data.key}-success`);
    })
    .catch((error) => {
      event.sender.send(`${data.key}-error`, error);
    });
});

ipcMain.on('__get-item', (event, key) => {
  appStorage
    .getItem(key)
    .then((value) => {
      event.sender.send(`${key}-success`, value);
    })
    .catch((error) => {
      event.sender.send(`${key}-error`, error);
    });
});

ipcMain.on('__delete-item', (event, key) => {
  appStorage
    .deleteItem(key)
    .then((value) => {
      event.sender.send(`${key}-success`, value);
    })
    .catch((error) => {
      event.sender.send(`${key}-error`, error);
    });
});

ipcMain.on('__load-url', (event, url) => {
  loadTargetUrl(url);
});

ipcMain.on('__load-proxy-configuration', (event) => {
  // reset old token configuration
  appStorage.deleteItem('__local-proxy-token').finally(() => {
    loadProxyConfiguration();
  });
});

ipcMain.on('__build-proxy-token', () => {
  requestNewProxyToken();
});

ipcMain.on('__get-page-data', (event, data) => {
  event.sender.send('__get-page-data-success', getPageData(data.page));
});

ipcMain.on('__get-page-key-data', (event, data) => {
  event.sender.send(
    '__get-page-key-data-success',
    getPageKeyData(data.page, data.key),
  );
});
