import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentHomeComponent } from './treatment-home.component';

describe('TreatmentHomeComponent', () => {
  let component: TreatmentHomeComponent;
  let fixture: ComponentFixture<TreatmentHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreatmentHomeComponent]
    });
    fixture = TestBed.createComponent(TreatmentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
