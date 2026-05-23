import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Policy, PolicyState } from '../models/policy.model';

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

  policies = computed(() => this.state().policies);
  loadingState = computed(() => this.state().loadingState);
  error = computed(() => this.state().error);
  submitting = computed(() => this.state().submitting);

  getPolicies(): void {
    this.updateState({ loadingState: 'loading', error: null });

    this.http.get<Policy[]>(`${this.baseUrl}`).subscribe({
      next: policies => this.updateState({ policies, loadingState: 'success' }),
      error: error => this.updateState({ error: this.getErrorMessage(error, 'get policies'), loadingState: 'error' })
    });
  }

  getPolicy(policyNumber: number): Observable<Policy> {
    return this.http.get<Policy>(`${this.baseUrl}/${policyNumber}`).pipe(
      catchError(error => {
        this.updateState({ error: this.getErrorMessage(error, 'get policy'), loadingState: 'error' });
        return throwError(() => error);
      })
    );
  }

  private getErrorMessage(error: unknown, action: string): string {
    return `Unable to ${action}. Please try again later.`;
  }

  private updateState(partial: Partial<PolicyState>): void {
    this.state.update(current => ({ ...current, ...partial }));
  }

}
