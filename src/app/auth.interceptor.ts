import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MemoryServiceService } from './service/memory-service.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const memoryService = inject(MemoryServiceService);
  const router = inject(Router);

  if (req.url.includes('/login')) {
    return next(req);
  }

  const username = memoryService.getCredential('username');
  if (username) {
    let clonedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + memoryService.getCredential('token'),
      },
    });
    return next(clonedReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          memoryService.clearCredentail();
          console.error('401 Unauthorized! Redirecting to login.');
          router.navigate(['']);
        } else if (error.status === 500) {
          console.error('500 Internal Server Error occurred.');
          router.navigate(['']);
        }
        return throwError(() => error);
      })
    );
  } else {
    console.log('No username found, request without Authorization header');
    return next(req);
  }
};