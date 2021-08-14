import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TwoStepSetupComponent } from './two-step-setup.component';

describe('TwoStepSetupComponent', () => {
  let component: TwoStepSetupComponent;
  let fixture: ComponentFixture<TwoStepSetupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoStepSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoStepSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
