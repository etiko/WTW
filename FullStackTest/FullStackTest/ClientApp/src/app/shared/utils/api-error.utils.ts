import { HttpErrorResponse } from '@angular/common/http';

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!(error instanceof HttpErrorResponse)) {
    return fallback;
  }

  switch (error.status) {
    case 400:
      return 'Invalid data submitted. Please check your inputs.';

    case 404:
      return 'The requested policy could not be found.';

    case 409:
      return 'A policy with this number already exists.';

    case 500:
      return 'A server error occurred. Please try again later.';

    default:
      return fallback;
  }
}
