import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { UserService } from './Service/user.service';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { JwtInterceptorService } from './Service/jwt-interceptor.service';
import { ErrorInterceptorService } from './Service/error-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(), 
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService,multi:true},
    {provide: HTTP_INTERCEPTORS, useFactory: ErrorInterceptorService,multi:true}
  ]
};
