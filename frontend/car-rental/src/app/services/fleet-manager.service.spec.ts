import { TestBed } from '@angular/core/testing';

import { FleetManagerService } from './fleet-manager.service';

describe('FleetManagerService', () => {
  let service: FleetManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
