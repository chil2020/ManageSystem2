import { UserService } from '@modules/auth/services';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models';
import { catchError, map, tap } from 'rxjs/operators';
import { constant } from '@modules/constant';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private userService: UserService) {}
    authResult!: any;
    user!: User;
    canActivate(): Observable<boolean> {
        // const user = sessionStorage.getItem('user');
        const employee = localStorage.getItem(constant.localstorage_employee);
        if (employee === null) {
            this.router.navigate(['auth']); // 改為導向 /login
            return of(false);
        } else {
            return of(true);
        }
    }

    /** 驗證使用者身分 */
    authentcate(username: string): Observable<any> {
      return this.userService.getUser(username).pipe(
        tap((user: User) =>
            console.log(`search user w/ name=${user.name}`)
        )
        ,map((user :User)=> user.password)
        ,catchError(this.handleError<User>('addPosition'))
    );
    //    console.log('result: '+this.authResult);
        // if (datas.password==password)
        //     {
        //         console.warn('auth ok');
                // sessionStorage.setItem('user', username);
        //         this.authResult=true;
        //     }
        // else
        //     {console.warn('auth false');
        //     this.authResult=false;
        //       }
        // return of(false)

        }
    /** 清除session storage的使用者名稱 */
    clearSession() {
        localStorage.removeItem(constant.localstorage_employee);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}

