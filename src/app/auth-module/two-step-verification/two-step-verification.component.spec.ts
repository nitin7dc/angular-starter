import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoStepVerificationComponent } from './two-step-verification.component';

describe('TwoStepVerificationComponent', () => {
  let component: TwoStepVerificationComponent;
  let fixture: ComponentFixture<TwoStepVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoStepVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoStepVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
