import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyFormPageComponent } from './policy-form-page.component';

describe('PolicyFormPageComponent', () => {
  let component: PolicyFormPageComponent;
  let fixture: ComponentFixture<PolicyFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyFormPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PolicyFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
