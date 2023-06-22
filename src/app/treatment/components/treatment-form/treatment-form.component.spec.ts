import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentFormComponent } from './treatment-form.component';

describe('TreatmentFormComponent', () => {
  let component: TreatmentFormComponent;
  let fixture: ComponentFixture<TreatmentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreatmentFormComponent]
    });
    fixture = TestBed.createComponent(TreatmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
