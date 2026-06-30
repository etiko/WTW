import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { POLICY_ROUTES } from '@shared/constants/routes';
import { PolicyLandingPageComponent } from './policy-landing-page.component';
import { PolicyService } from '../../services/policy.service';
import { Gender } from '../../models/gender.model';
import { Policy } from '../../models/policy.model';

const mockPolicies: Policy[] = [
  { policyNumber: 1, policyHolder: { name: 'Alice', age: 30, gender: Gender.Female } },
  { policyNumber: 2, policyHolder: { name: 'Bob', age: 40, gender: Gender.Male } },
  { policyNumber: 3, policyHolder: { name: 'Carol', age: 26, gender: Gender.Female } },
];

describe('PolicyLandingPageComponent', () => {
  let component: PolicyLandingPageComponent;
  let fixture: ComponentFixture<PolicyLandingPageComponent>;
  let router: Router;
  let policiesSignal: ReturnType<typeof signal<Policy[]>>;

  beforeEach(async () => {
    policiesSignal = signal<Policy[]>(mockPolicies);

    await TestBed.configureTestingModule({
      imports: [PolicyLandingPageComponent],
      providers: [
        provideRouter([]),
        {
          provide: PolicyService,
          useValue: {
            policies: policiesSignal,
            loadingState: signal('success'),
            error: signal(null),
            getPolicies: jest.fn().mockReturnValue(of(mockPolicies)),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture = TestBed.createComponent(PolicyLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('totalPolicies reflects the number of policies', () => {
    expect(component.totalPolicies()).toBe(3);
  });

  it('femaleCount counts Female policy holders', () => {
    expect(component.femaleCount()).toBe(2);
  });

  it('maleCount counts Male policy holders', () => {
    expect(component.maleCount()).toBe(1);
  });

  it('averageHolderAge returns rounded average age', () => {
    // (30 + 40 + 26) / 3 = 32
    expect(component.averageHolderAge()).toBe(32);
  });

  it('averageHolderAge returns 0 when there are no policies', () => {
    policiesSignal.set([]);
    expect(component.averageHolderAge()).toBe(0);
  });

  it('handlePolicySelected navigates to the edit route for that policy', () => {
    component.handlePolicySelected(mockPolicies[0]);
    expect(router.navigate).toHaveBeenCalledWith([POLICY_ROUTES.EDIT, 1]);
  });
});
