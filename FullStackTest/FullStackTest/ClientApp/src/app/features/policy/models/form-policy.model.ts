import { Gender } from "./gender.model";

export interface PolicyFormData {
  policyNumber: number | null;
  policyHolder: PolicyHolderFormData;
}

export interface PolicyHolderFormData {
  name: string;
  age: number | null;
  gender: Gender | null;
}

export const FORM_MODES = {
  CREATE: 'create',
  EDIT: 'edit',
} as const;

export type FormMode = typeof FORM_MODES[keyof typeof FORM_MODES];

export interface Feedback {
  type: 'success' | 'error';
  message: string;
}
