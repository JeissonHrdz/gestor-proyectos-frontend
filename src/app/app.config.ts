import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { UserService } from './Service/user.service';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { JwtInterceptorService } from './Service/jwt-interceptor.service';
import { ErrorInterceptorService } from './Service/error-interceptor.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },

    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync(),

    // {provide: HTTP_INTERCEPTORS, useFactory: ErrorInterceptorService,multi:true}
  ],
};
