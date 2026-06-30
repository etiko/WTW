import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { getApiErrorMessage } from '@shared/utils/api-error.utils';

import { Policy, PolicyState } from '../models/policy.model';
import { PolicyFormData } from '../models/form-policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private http = inject(HttpClient);
  private baseUrl = '/api/policy';

  private state = signal<PolicyState>({
    policies: [],
    loadingState: 'idle',
    error: null,
    submitting: false
  });

  readonly policies = computed(() => this.state().policies);
  readonly loadingState = computed(() => this.state().loadingState);
  readonly error = computed(() => this.state().error);
  readonly submitting = computed(() => this.state().submitting);

  getPolicies(): Observable<Policy[]> {
    this.updateState({ loadingState: 'loading', error: null });

    return this.http.get<Policy[]>(this.baseUrl).pipe(
      tap((policies: Policy[]) => this.updateState({ policies, loadingState: 'success' })),
      catchError((error: unknown) => this.handleError(error, 'get policies', true))
    );
  }

  getPolicy(policyNumber: number): Observable<Policy> {
    return this.http.get<Policy>(`${this.baseUrl}/${policyNumber}`).pipe(
      catchError((error: unknown) => this.handleError(error, 'get policy'))
    );
  }

  createPolicy(formData: PolicyFormData): Observable<Policy> {
    this.updateState({ submitting: true, error: null });

    return this.http.post<Policy>(this.baseUrl, formData).pipe(
      tap((savedPolicy: Policy) => {
        const policies = [...this.state().policies, savedPolicy];
        this.updateState({ policies, submitting: false });
      }),
      catchError((error: unknown) => this.handleError(error, 'create policy')),
      finalize(() => this.updateState({ submitting: false }))
    );
  }

  updatePolicy(policyNumber: number, policy: Policy): Observable<Policy> {
    this.updateState({ submitting: true, error: null });

    return this.http.put<Policy>(`${this.baseUrl}/${policyNumber}`, policy).pipe(
      tap((savedPolicy: Policy) => {
        const policies = this.state().policies.map(policy => policy.policyNumber === policyNumber ? savedPolicy : policy);
        this.updateState({ policies, submitting: false });
      }),
      catchError((error: unknown) => this.handleError(error, 'update policy')),
      finalize(() => this.updateState({ submitting: false }))
    );
  }

  deletePolicy(policyNumber: number): Observable<void> {
    this.updateState({ submitting: true, error: null });

    return this.http.delete<void>(`${this.baseUrl}/${policyNumber}`).pipe(
      tap(() => {
        const policies = this.state().policies.filter(p => p.policyNumber !== policyNumber);
        this.updateState({ policies, submitting: false });
      }),
      catchError((error: unknown) => this.handleError(error, 'delete policy')),
      finalize(() => this.updateState({ submitting: false }))
    );
  }

  private handleError(error: unknown, action: string, isListOperation = false): Observable<never> {
    const message = getApiErrorMessage(error, `Unable to ${action}. Please try again later.`);
    const update: Partial<PolicyState> = { error: message, submitting: false };
    if (isListOperation) update.loadingState = 'error';
    this.updateState(update);
    return throwError(() => error);
  }

  private updateState(partial: Partial<PolicyState>): void {
    this.state.update(current => ({ ...current, ...partial }));
  }

}
