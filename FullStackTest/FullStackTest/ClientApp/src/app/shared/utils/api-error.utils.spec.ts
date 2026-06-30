import { HttpErrorResponse } from '@angular/common/http';

import { getApiErrorMessage } from './api-error.utils';

describe('getApiErrorMessage', () => {
  it.each([
    [400, 'Invalid data submitted. Please check your inputs.'],
    [404, 'The requested policy could not be found.'],
    [409, 'A policy with this number already exists.'],
    [500, 'A server error occurred. Please try again later.'],
    [503, 'fallback'],
  ])('returns correct message for HttpErrorResponse with status %i', (status, expected) => {
    const error = new HttpErrorResponse({ status });
    expect(getApiErrorMessage(error, 'fallback')).toBe(expected);
  });

  it('returns fallback for a plain Error', () => {
    expect(getApiErrorMessage(new Error('oops'), 'fallback')).toBe('fallback');
  });
});
