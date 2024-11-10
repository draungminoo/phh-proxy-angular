import { TestBed } from '@angular/core/testing';

import { CryptoJsService } from './cryptojs.service';

describe('CruptoJsService', () => {
  let service: CryptoJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoJsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
