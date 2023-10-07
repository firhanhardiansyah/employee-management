import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageKey } from '@enums/storage-key.enum';
import { StorageHelper } from '@helpers/storage.helper';

export const authGuard: CanActivateFn = (route, state) => {
  if (StorageHelper.getItem(StorageKey.TOKEN)) {
    return true;
  }

  const router = inject(Router);
  router.navigate(['login']);
  return false;
};
