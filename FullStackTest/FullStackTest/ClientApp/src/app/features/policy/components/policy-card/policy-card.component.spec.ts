import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyCardComponent } from './policy-card.component';
import { Gender } from '../../models/gender.model';
import { Policy } from '../../models/policy.model';

const mockPolicy: Policy = {
  policyNumber: 1001,
  policyHolder: { name: 'Alice', age: 30, gender: Gender.Female },
};

describe('PolicyCardComponent', () => {
  let component: PolicyCardComponent;
  let fixture: ComponentFixture<PolicyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('policy', mockPolicy);
    fixture.detectChanges();
  });

  it.each([
    [Gender.Female, 'Female'],
    [Gender.Male, 'Male'],
    [99 as Gender, 'Unknown'],
  ])('genderLabel returns %s for gender value %i', (gender, expected) => {
    fixture.componentRef.setInput('policy', { ...mockPolicy, policyHolder: { ...mockPolicy.policyHolder, gender } });
    expect(component.genderLabel()).toBe(expected);
  });
});
