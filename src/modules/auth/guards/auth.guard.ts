import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}
    canActivate(): Observable<boolean> {
        const user = sessionStorage.getItem('user');
        if (user === null) {
            this.router.navigate(['auth']); // 改為導向 /login
            return of(false);
        } else {
            return of(true);
        }
    }

    /** 驗證使用者身分 */
    authentcate(username: string, password: string) {
        if (username === 'Admin' && password === '111') {
            sessionStorage.setItem('user', username);
            return true;
        } else {
            return false;
        }
    }
    /** 清除session storage的使用者名稱 */
    clearSession() {
        sessionStorage.removeItem('user');
    }
}
