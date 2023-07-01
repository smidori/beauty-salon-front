import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentTypeFormComponent } from './treatment-type-form.component';

describe('TreatmentTypeFormComponent', () => {
  let component: TreatmentTypeFormComponent;
  let fixture: ComponentFixture<TreatmentTypeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreatmentTypeFormComponent]
    });
    fixture = TestBed.createComponent(TreatmentTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
