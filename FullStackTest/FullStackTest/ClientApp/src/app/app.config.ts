import { provideHttpClient } from "@angular/common/http";
import { APP_ID, ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: APP_ID, useValue: 'wtw-fs-test' }
  ]
};
