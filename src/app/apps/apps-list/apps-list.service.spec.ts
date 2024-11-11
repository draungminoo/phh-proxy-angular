import { TestBed } from '@angular/core/testing';

import { AppsListService } from './apps-list.service';

describe('AppsListService', () => {
  let service: AppsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
