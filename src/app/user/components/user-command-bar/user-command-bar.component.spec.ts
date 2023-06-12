import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommandBarComponent } from './user-command-bar.component';

describe('UserCommandBarComponent', () => {
  let component: UserCommandBarComponent;
  let fixture: ComponentFixture<UserCommandBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCommandBarComponent]
    });
    fixture = TestBed.createComponent(UserCommandBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
