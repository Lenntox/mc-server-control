import { TestBed } from '@angular/core/testing';

import { McstatusService } from './mcstatus.service';

describe('McstatusService', () => {
  let service: McstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(McstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
