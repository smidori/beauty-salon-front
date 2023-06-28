import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentCommandBarComponent } from './treatment-command-bar.component';

describe('TreatmentCommandBarComponent', () => {
  let component: TreatmentCommandBarComponent;
  let fixture: ComponentFixture<TreatmentCommandBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreatmentCommandBarComponent]
    });
    fixture = TestBed.createComponent(TreatmentCommandBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
