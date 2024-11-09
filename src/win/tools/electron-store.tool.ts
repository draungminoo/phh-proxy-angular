import { createHash } from 'crypto';
import { app, safeStorage } from 'electron';
import { mkdir, readFile, rm, writeFile } from 'fs';
import { join } from 'path';

const hashAlgorithm = 'sha256';

export const appStorage = {
  setItem(key: string, value: string) {
    const userData = app.getPath('userData');
    const dirPath = join(userData, 'app-storage');

    return new Promise<void>(async (res, rej) => {
      mkdir(dirPath, { recursive: true }, () => {
        writeFile(
          join(dirPath, createHash(hashAlgorithm).update(key).digest('hex')),
          safeStorage.encryptString(value),
          (error) => {
            if (error) {
              rej(error);
            } else {
              res();
            }
          },
        );
      });
    });
  },
  getItem(key: string) {
    const userData = app.getPath('userData');
    return new Promise<string>((res, rej) => {
      readFile(
        join(
          userData,
          'app-storage',
          createHash(hashAlgorithm).update(key).digest('hex'),
        ),
        (error, buffer) => {
          if (error) {
            rej(error);
          } else {
            res(safeStorage.decryptString(buffer));
          }
        },
      );
    });
  },
  deleteItem(key: string) {
    const userData = app.getPath('userData');
    return new Promise<void>((res, rej) => {
      rm(
        join(
          userData,
          'app-storage',
          createHash(hashAlgorithm).update(key).digest('hex'),
        ),
        (error) => {
          if (error) {
            rej(error);
          } else {
            res();
          }
        },
      );
    });
  },
};
