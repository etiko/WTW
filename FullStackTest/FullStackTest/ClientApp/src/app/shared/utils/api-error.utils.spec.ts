import { HttpErrorResponse } from '@angular/common/http';

import { getApiErrorMessage } from './api-error.utils';

describe('getApiErrorMessage', () => {
  it('returns 400 message for HttpErrorResponse with status 400', () => {
    const error = new HttpErrorResponse({ status: 400 });
    expect(getApiErrorMessage(error, 'fallback')).toBe('Invalid data submitted. Please check your inputs.');
  });

  it('returns 404 message for HttpErrorResponse with status 404', () => {
    const error = new HttpErrorResponse({ status: 404 });
    expect(getApiErrorMessage(error, 'fallback')).toBe('The requested policy could not be found.');
  });

  it('returns 409 message for HttpErrorResponse with status 409', () => {
    const error = new HttpErrorResponse({ status: 409 });
    expect(getApiErrorMessage(error, 'fallback')).toBe('A policy with this number already exists.');
  });

  it('returns 500 message for HttpErrorResponse with status 500', () => {
    const error = new HttpErrorResponse({ status: 500 });
    expect(getApiErrorMessage(error, 'fallback')).toBe('A server error occurred. Please try again later.');
  });

  it('returns fallback for unknown status', () => {
    const error = new HttpErrorResponse({ status: 503 });
    expect(getApiErrorMessage(error, 'fallback')).toBe('fallback');
  });

  it('returns fallback for a plain Error', () => {
    expect(getApiErrorMessage(new Error('oops'), 'fallback')).toBe('fallback');
  });

  it('returns correct message for plain object with known status', () => {
    expect(getApiErrorMessage({ status: 404 }, 'fallback')).toBe('The requested policy could not be found.');
  });
});
