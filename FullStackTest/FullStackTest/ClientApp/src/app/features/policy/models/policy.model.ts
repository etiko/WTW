import { Gender } from "./gender.model";

export interface PolicyState {
  policies: Policy[];
  loadingState: LoadingState;
  error: string | null;
  submitting: boolean;
}

export interface Policy {
  policyNumber: number;
  policyHolder: PolicyHolder;
}

export interface PolicyHolder {
  name: string;
  age: number;
  gender: Gender;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';