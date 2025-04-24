import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MemoryServiceService } from './service/memory-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const memoryService = inject(MemoryServiceService);
  const username = memoryService.getCredential('username');

  if (username) {
    return true; // Allow access
  } else {
    router.navigate(['']); // Redirect to login if no username
    return false; // Deny access
  }
};
