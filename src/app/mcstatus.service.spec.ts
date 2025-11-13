import { TestBed } from '@angular/core/testing';

import { McstatusService } from './mcstatus.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('McstatusService', () => {
  let service: McstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(McstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
