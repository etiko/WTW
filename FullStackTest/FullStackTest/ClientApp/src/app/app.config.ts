import { provideHttpClient } from "@angular/common/http";
import { APP_ID, ApplicationConfig } from "@angular/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    { provide: APP_ID, useValue: 'wtw-fs-test' }
  ]
};
