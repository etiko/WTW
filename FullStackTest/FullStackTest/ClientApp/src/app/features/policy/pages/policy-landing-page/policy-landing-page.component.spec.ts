import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyLandingPageComponent } from './policy-landing-page.component';

describe('PolicyLandingPageComponent', () => {
  let component: PolicyLandingPageComponent;
  let fixture: ComponentFixture<PolicyLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyLandingPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PolicyLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
