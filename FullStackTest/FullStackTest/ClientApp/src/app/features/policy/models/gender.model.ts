export enum Gender {
  Male = 0,
  Female = 1
}

export const GENDER_OPTIONS = [
  { value: Gender.Male, label: 'Male' },
  { value: Gender.Female, label: 'Female' }
] as const;

export type GenderOption = (typeof GENDER_OPTIONS)[number];