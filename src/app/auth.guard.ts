import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot,CanActivate,RouterStateSnapshot,UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { SellerService } from './services/seller.service';
import { UserService } from './services/user.service';
@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate{
  constructor(private sellerService:SellerService, private userService:UserService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if(localStorage.getItem('seller')){
        return true;
      }
      return this.sellerService.isSellerLoggedIn;
  }
//   const token = this.userService.getToken();

//   if (token) {
//     // User is authenticated
//     return true;
//   } else {
//     // User is not authenticated, redirect to login
//     this.router.navigate(['/user-auth']);
//     return false;
//   }
// }
}
