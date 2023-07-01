import { TestBed } from '@angular/core/testing';

import { TreatmentTypeService } from './treatment-type.service';

describe('TreatmentTypeService', () => {
  let service: TreatmentTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreatmentTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
