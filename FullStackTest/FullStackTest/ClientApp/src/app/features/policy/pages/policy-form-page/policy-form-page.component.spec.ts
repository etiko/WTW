import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { PolicyFormPageComponent } from './policy-form-page.component';
import { PolicyService } from '../../services/policy.service';
import { Gender } from '../../models/gender.model';
import { Policy } from '../../models/policy.model';
import { PolicyFormData } from '../../models/form-policy.model';

const mockPolicy: Policy = {
  policyNumber: 1001,
  policyHolder: { name: 'Alice', age: 30, gender: Gender.Female },
};

const mockFormData: PolicyFormData = {
  policyNumber: 1001,
  policyHolder: { name: 'Alice', age: 30, gender: Gender.Female },
};

function createMockPolicyService() {
  return {
    getPolicy: jest.fn().mockReturnValue(of(mockPolicy)),
    createPolicy: jest.fn().mockReturnValue(of(mockPolicy)),
    updatePolicy: jest.fn().mockReturnValue(of(mockPolicy)),
    deletePolicy: jest.fn().mockReturnValue(of(undefined)),
    error: signal<string | null>(null),
    submitting: signal(false),
  };
}

async function setup(policyNumberParam: string) {
  const mockPolicyService = createMockPolicyService();

  await TestBed.configureTestingModule({
    imports: [PolicyFormPageComponent],
    providers: [
      provideRouter([]),
      { provide: PolicyService, useValue: mockPolicyService },
      {
        provide: ActivatedRoute,
        useValue: { snapshot: { paramMap: { get: jest.fn().mockReturnValue(policyNumberParam) } } },
      },
    ],
    schemas: [NO_ERRORS_SCHEMA],
  }).compileComponents();

  const router = TestBed.inject(Router);
  const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

  const fixture: ComponentFixture<PolicyFormPageComponent> = TestBed.createComponent(PolicyFormPageComponent);
  const component = fixture.componentInstance;
  fixture.detectChanges();

  return { fixture, component, mockPolicyService, navigateSpy };
}

describe('PolicyFormPageComponent — CREATE mode', () => {
  let component: PolicyFormPageComponent;
  let mockPolicyService: ReturnType<typeof createMockPolicyService>;

  beforeEach(async () => {
    ({ component, mockPolicyService } = await setup('createPolicy'));
  });

  it('starts in CREATE mode', () => {
    expect(component.formMode()).toBe('create');
  });

  it('handleSubmit calls createPolicy with the provided form data', () => {
    component.handleSubmit(mockFormData);
    expect(mockPolicyService.createPolicy).toHaveBeenCalledWith(mockFormData);
  });

  it('handleSubmit sets success feedback after create', () => {
    component.handleSubmit(mockFormData);
    expect(component.feedback()?.type).toBe('success');
  });

  it('handleReset clears feedback', () => {
    component.feedback.set({ type: 'success', message: 'Done' });
    component.handleReset();
    expect(component.feedback()).toBeNull();
  });
});

describe('PolicyFormPageComponent — EDIT mode', () => {
  let component: PolicyFormPageComponent;
  let mockPolicyService: ReturnType<typeof createMockPolicyService>;
  let navigateSpy: jest.SpyInstance;

  beforeEach(async () => {
    ({ component, mockPolicyService, navigateSpy } = await setup('1001'));
  });

  it('starts in EDIT mode', () => {
    expect(component.formMode()).toBe('edit');
  });

  it('loads the policy on init', () => {
    expect(mockPolicyService.getPolicy).toHaveBeenCalledWith(1001);
    expect(component.originalPolicy()).toEqual(mockPolicy);
  });

  it('handleSubmit calls updatePolicy', () => {
    component.handleSubmit(mockFormData);
    expect(mockPolicyService.updatePolicy).toHaveBeenCalled();
  });

  it('handleDelete calls deletePolicy and navigates to /policies', () => {
    component.handleDelete();
    expect(mockPolicyService.deletePolicy).toHaveBeenCalledWith(1001);
    expect(navigateSpy).toHaveBeenCalledWith(['/policies']);
  });

  it('handleDelete sets error feedback on failure', () => {
    mockPolicyService.deletePolicy.mockReturnValue(throwError(() => new Error('fail')));
    component.handleDelete();
    expect(component.feedback()?.type).toBe('error');
  });
});
