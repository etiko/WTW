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

  it('returns Female label for female gender', () => {
    expect(component.genderLabel()).toBe('Female');
  });

  it('returns Male label for male gender', () => {
    const malePolicy = { ...mockPolicy, policyHolder: { ...mockPolicy.policyHolder, gender: Gender.Male } };
    fixture.componentRef.setInput('policy', malePolicy);
    expect(component.genderLabel()).toBe('Male');
  });

  it('returns Unknown for an unrecognised gender value', () => {
    const unknownPolicy = { ...mockPolicy, policyHolder: { ...mockPolicy.policyHolder, gender: 99 as Gender } };
    fixture.componentRef.setInput('policy', unknownPolicy);
    expect(component.genderLabel()).toBe('Unknown');
  });
});
