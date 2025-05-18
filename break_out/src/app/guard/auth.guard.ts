import { CanActivateFn, Router } from '@angular/router';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router(); 

  return new Promise<boolean>((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(true); 
      } else {
        router.navigate(['/authenticate']);
        resolve(false);
      }
    });
  });
};